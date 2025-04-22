from django.core.exceptions import PermissionDenied, ValidationError
from django.http.response import JsonResponse, HttpResponse
from rest_framework import generics, permissions
from rest_framework.views import APIView

from utils.eoq import EOQComparer
from .models import Company, Sector, Product
from .serializers import (
    SectorSerializer,
    CompanyFullSerializer,
    CompanyPublicSerializer,
    ProductPublicSerializer
)

"""GET /api/profile/ - returns your own company"""
class MyCompanyView(generics.RetrieveAPIView):
    serializer_class = CompanyFullSerializer

    def get_object(self):
        return self.request.user.company


"""GET /api/sectors/ - list all sectors"""
class SectorListView(generics.ListAPIView):
    queryset = Sector.objects.all()
    serializer_class = SectorSerializer


"""GET /api/market/companies/ - list all other companies"""
class MarketCompaniesView(generics.ListAPIView):
    serializer_class = CompanyPublicSerializer

    def get_queryset(self):
        company = getattr(self.request.user, 'company', None)
        if (company is None): return Company.objects.all()
        return Company.objects.exclude(id=self.request.user.company.id)


"""GET /api/market/company/<id> - list all other companies"""
class MarketCompanyView(APIView):

    def get(self, request, company_id):
        try:
            holding_cost = 0
            annual_demand = 0
            predict_demand = True
            if 'holdingCost' in self.request.GET and int(request.GET.get('holdingCost')) > 0:
                holding_cost = request.GET.get('holdingCost')
            if 'annualDemand' in self.request.GET and int(request.GET.get('annualDemand')) > 0:
                annual_demand = self.request.GET['annualDemand']
            if 'predictDemand' in self.request.GET:
                predict_demand = request.GET.get('predictDemand')

            company = Company.objects.get(id=company_id)
            if not company:
                return handle_error("Company not found", 404)

            company_data = CompanyPublicSerializer(company).data
            # predict demand to boolean
            predict_demand = bool(predict_demand)
            if not annual_demand and (predict_demand and holding_cost):
                products_data, predicted_eoq = EOQComparer.calculateEOQ(company, 0, holding_cost)
                company_data['products'] = products_data
                company_data['predicted_eoq'] = predicted_eoq
                return JsonResponse(company_data, safe=False)

            if annual_demand and annual_demand:
                products_data, predicted_eoq = EOQComparer.calculateEOQ(company, annual_demand, holding_cost)
                company_data['products'] = products_data
                company_data['predicted_eoq'] = predicted_eoq
                return JsonResponse(company_data, safe=False)

            return JsonResponse(company_data, safe=False)
        except ValidationError as e:
            return handle_error(str(e), 400)



"""GET /api/market/companies/<company_id>/products/ - products of a specific company"""
class CompanyProductsView(generics.ListAPIView):
    serializer_class = ProductPublicSerializer

    def get_queryset(self):
        company_id = int(self.kwargs['company_id'])

        # Verifica se l'utente loggato ha una company
        user_company = getattr(self.request.user, 'company', None)
        if user_company and user_company.id == company_id:
            raise PermissionDenied("You can't view your own products this way.")

        return Product.objects.filter(company__id=company_id)


def handle_error(message: str, status_code: int = 400):
    """
    Helper function to handle errors in a consistent way.
    """
    return JsonResponse({"detail": message}, content_type="application/json", status=status_code)
