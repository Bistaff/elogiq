from rest_framework import serializers
from .models import Sector, Company, Product, PriceTier


class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = ['id', 'name']


"""Serializer for price tiers of products"""
class PriceTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceTier
        fields = ['id', 'min_quantity', 'unit_price']


"""Serializer for products of other companies"""
class ProductPublicSerializer(serializers.ModelSerializer):
    price_tiers = PriceTierSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'year_launched', 'description', 'price', 'price_tiers', 'historical_sales']


"""Serializer for other companies"""
class CompanyPublicSerializer(serializers.ModelSerializer):
    sector = SectorSerializer(read_only=True)
    products = ProductPublicSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ['id', 'name', 'sector', 'products']


"""Serializer for your own company"""
class CompanyFullSerializer(serializers.ModelSerializer):
    sector = SectorSerializer(read_only=True)
    products = ProductPublicSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ['id', 'name', 'sector', 'products']