from rest_framework import serializers
from inventory.models.Products import Products

from inventory.models.Sales import Sales
from inventory.models.Taxes import Taxes

from ..models import SaleDescriptions

class SaleDescriptionSerializer(serializers.ModelSerializer):
    sale_id = serializers.IntegerField(source='sale.sale_id')
    product_id = serializers.IntegerField(source='product.product_id')
    tax_id = serializers.IntegerField(source='tax.tax_id')
    
    class Meta:
        model = SaleDescriptions
        fields = ["sale_id", "units", "quantity",
                "discount", "total", "product_id", "tax_id","description_id"]

    def create(self, validated_data):
        product = validated_data.pop("product")
        tax = validated_data.pop("tax")
        sale = validated_data.pop("sale")
        try:
            product_instance = Products.objects.get(
                product_id=product["product_id"]
            )
            tax_instance=Taxes.objects.get(
                tax_id=tax["tax_id"]
            )
            sale_instance = Sales.objects.get(
                sale_id=sale["sale_id"]
            )
            sale_description_instance = SaleDescriptions.objects.create(tax=tax_instance, sale=sale_instance,product=product_instance ,**validated_data)
            return sale_description_instance
        except Sales.DoesNotExist:
            raise serializers.ValidationError('Sale does not exist')
        except Products.DoesNotExist:
            raise serializers.ValidationError('Product does not exist')
        except Taxes.DoesNotExist:
            raise serializers.ValidationError('Tax does not exist')
