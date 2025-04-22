from django.contrib import admin
from .models import Company, Sector, Product, PriceTier

class PriceTierInline(admin.TabularInline):
    model = PriceTier
    extra = 1  # Show at least one tier
    max_num = 5 # Limit to 5 tiers
    can_delete = True # Allow deleting tiers

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'company']
    inlines = [PriceTierInline]

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'sector', 'user']

@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
