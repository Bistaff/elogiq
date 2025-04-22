from django.db import models
from django.contrib.auth.models import User

class Sector(models.Model):
    """Represents an industry sector (e.g., agriculture, technology)."""
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Company(models.Model):
    """
    Represents a company linked to a Django user.
    Each user can create only one company.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='company')
    name = models.CharField(max_length=255)
    sector = models.ForeignKey(Sector, on_delete=models.PROTECT)

    def __str__(self):
        return self.name


class Product(models.Model):
    """
    Represents a product created by a company.
    Other companies can view and potentially purchase this product.
    """
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='products')
    year_launched = models.PositiveIntegerField(help_text="Year the product was launched", default=2025)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Unit price of the product", null=False, default=0)
    ordering_cost = models.DecimalField(max_digits=10, decimal_places=2, help_text="Fixed cost per order (S)")
    historical_sales = models.JSONField()
    # holding_cost = models.DecimalField(max_digits=10, decimal_places=2, help_text="Annual holding cost per unit (H)")
    # annual_demand = models.PositiveIntegerField(help_text="Estimated annual demand (D)")

    def __str__(self):
        return f"{self.name} by {self.company.name}"

    # def get_best_eoq_option(self):
    #     """Returns the best EOQ option considering quantity discount tiers."""
    #     return EOQCalculator.get_optimal_quantity(self)


class PriceTier(models.Model):
    """
    Represents a quantity discount tier for a product.
    Created inline when a product is added.
    """
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='price_tiers')
    min_quantity = models.PositiveIntegerField(help_text="Minimum quantity for this price tier (Q_min)")
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Unit price at this tier")

    class Meta:
        ordering = ['min_quantity']
        verbose_name = "Price Tier"
        verbose_name_plural = "Price Tiers"

    def __str__(self):
        return f"{self.product.name} - {self.min_quantity}+ units at {self.unit_price}€"
