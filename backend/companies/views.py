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
            company = Company.objects.get(id=company_id)
            if not company:
                return handle_error("Company not found", 404)
            return JsonResponse(CompanyPublicSerializer(company).data, safe=False)
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



"""GET /api/market/companies/<company_id>/products/<product_id>/ - products of a specific company"""
class CompanyProductView(APIView):
    serializer_class = ProductPublicSerializer

    def get(self, request, company_id, product_id):
        if not company_id or not product_id:
            return handle_error("Company ID and Product ID are required", 400)
        user_company = getattr(self.request.user, 'company', None)
        if user_company and user_company.id == company_id:
            raise PermissionDenied("You can't view your own products this way.")

        holding_cost = 0
        annual_demand = 0
        setup_cost = 0
        predict_demand = True
        if 'holdingCost' in self.request.GET and int(request.GET.get('holdingCost')) > 0:
            holding_cost = request.GET.get('holdingCost')
        if 'setupCost' in self.request.GET and int(request.GET.get('setupCost')) > 0:
            setup_cost = request.GET.get('setupCost')
        if 'annualDemand' in self.request.GET and int(request.GET.get('annualDemand')) > 0:
            predict_demand = False
            annual_demand = self.request.GET['annualDemand']

        company = Company.objects.get(id=company_id)
        if not company:
            return handle_error("Company not found", 404)

        product = company.products.filter(id=product_id).first()
        if not product:
            return handle_error("Product not found", 404)

        product_data = {}
        # predict demand to boolean
        predict_demand = bool(predict_demand)
        if not annual_demand and (predict_demand and holding_cost):
            product_data = EOQComparer.calculateEOQ(product, 0, holding_cost, setup_cost)
            return JsonResponse(product_data, safe=False)

        if annual_demand and annual_demand:
            product_data = EOQComparer.calculateEOQ(product, annual_demand, holding_cost, setup_cost)
            return JsonResponse(product_data, safe=False)

        return JsonResponse(ProductPublicSerializer(product).data, safe=False)


def handle_error(message: str, status_code: int = 400):
    """
    Helper function to handle errors in a consistent way.
    """
    return JsonResponse({"detail": message}, content_type="application/json", status=status_code)
