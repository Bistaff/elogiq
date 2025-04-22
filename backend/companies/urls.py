from django.urls import path
from .views import (
    MyCompanyView,
    SectorListView,
    MarketCompaniesView,
    CompanyProductsView, MarketCompanyView,
)

urlpatterns = [
    path('profile/', MyCompanyView.as_view(), name='my-company'),
    path('sectors/', SectorListView.as_view(), name='sector-list'),
    path('market/companies/', MarketCompaniesView.as_view(), name='market-companies'),
    path('market/companies/<int:company_id>/', MarketCompanyView.as_view(), name='market-companies'),
    path('market/companies/<int:company_id>/products/', CompanyProductsView.as_view(), name='company-products'),
]
