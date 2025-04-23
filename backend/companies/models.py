from django.db import models
from django.contrib.auth.models import User

class Sector(models.Model):
    """Rappresenta un settore industriale (es. agricoltura, tecnologia)."""
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Company(models.Model):
    """Rappresenta un'azienda associata a un utente Django. Ogni utente può creare solo un'azienda."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='company')
    name = models.CharField(max_length=255)
    sector = models.ForeignKey(Sector, on_delete=models.PROTECT)

    def __str__(self):
        return self.name


class Product(models.Model):
    """Rappresenta un prodotto creato da un'azienda. Altre aziende possono visualizzare e acquistare questo prodotto."""
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='products')
    year_launched = models.PositiveIntegerField(help_text="Year the product was launched", default=2025)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Unit price of the product", null=False, default=0)
    historical_sales = models.JSONField()

    def __str__(self):
        return f"{self.name} by {self.company.name}"


class PriceTier(models.Model):
    """Rappresenta una fascia di prezzo per un prodotto. Ogni fascia ha una quantità minima e un prezzo unitario."""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='price_tiers')
    min_quantity = models.PositiveIntegerField(help_text="Minimum quantity for this price tier (Q_min)")
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Unit price at this tier")

    class Meta:
        ordering = ['min_quantity']
        verbose_name = "Price Tier"
        verbose_name_plural = "Price Tiers"

    def __str__(self):
        return f"{self.product.name} - {self.min_quantity}+ units at {self.unit_price}€"
