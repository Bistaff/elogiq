from django.core.exceptions import PermissionDenied, ValidationError
from django.http.response import JsonResponse, HttpResponse
from rest_framework import generics, permissions
from rest_framework.views import APIView

from utils.eoq import EOQComparatore
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
                return handle_error("Azienda non trovata", 404)
            return JsonResponse(CompanyPublicSerializer(company).data, safe=False)
        except Company.DoesNotExist:
            return handle_error("Azienda non trovata", 404)
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



"""GET /api/market/companies/<company_id>/products/<product_id>/ - prodotto di una specifica azienda"""
class CompanyProductView(APIView):
    serializer_class = ProductPublicSerializer

    def get(self, request, company_id, product_id):
        if not company_id or not product_id:
            return handle_error("Company ID and Product ID are required", 400)
        user_company = getattr(self.request.user, 'company', None)
        # Se l'utente loggato ha una company e il company_id è uguale a quello dell'utente, non può visualizzare i propri prodotti
        if user_company and user_company.id == company_id:
            raise PermissionDenied("You can't view your own products this way.")

        costo_mantenimento, domanda_anuale, costo_di_setup = 0, 0, 0
        previsione_domanda = True
        # Controlla se sono stati forniti i parametri di ricerca
        if 'holdingCost' in self.request.GET and int(request.GET.get('holdingCost')) > 0:
            costo_mantenimento = request.GET.get('holdingCost')
        if 'setupCost' in self.request.GET and int(request.GET.get('setupCost')) > 0:
            costo_di_setup = request.GET.get('setupCost')
        if 'annualDemand' in self.request.GET and int(request.GET.get('annualDemand')) > 0:
            previsione_domanda = False
            domanda_anuale = self.request.GET['annualDemand']

        # Controlla se l'azienda esiste
        company = Company.objects.get(id=company_id)
        if not company:
            return handle_error("Company not found", 404)

        # Controlla se il prodotto esiste
        product = company.products.filter(id=product_id).first()
        if not product:
            return handle_error("Product not found", 404)

        dati_prodotto = {}
        previsione_domanda = bool(previsione_domanda)
        if not domanda_anuale and (previsione_domanda and costo_mantenimento):
            dati_prodotto = EOQComparatore.calcolaEOQ(product, 0, costo_mantenimento, costo_di_setup)
            return JsonResponse(dati_prodotto, safe=False)

        if domanda_anuale and domanda_anuale:
            dati_prodotto = EOQComparatore.calcolaEOQ(product, domanda_anuale, costo_mantenimento, costo_di_setup)
            return JsonResponse(dati_prodotto, safe=False)

        return JsonResponse(ProductPublicSerializer(product).data, safe=False)


def handle_error(message: str, status_code: int = 400):
    """Funzione di utilità per gestire gli errori in modo coerente."""
    return JsonResponse({"detail": message}, content_type="application/json", status=status_code)
