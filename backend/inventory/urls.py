from rest_framework.routers import DefaultRouter

from inventory.controllers.SalesController import SalesController


from .controllers.CategoryProductsController import CategoryProductsController
from .controllers.EmployeeController import EmployeeController
from .controllers.ProductController import ProductController
from .controllers.CustomerController import CustomerController
from .controllers.TypePersonController import TypePersonController
from .controllers.TypeDocumentController import TypeDocumentController

appName = 'inventory'
router = DefaultRouter()

router.register(r'employees', EmployeeController, basename="employees")
router.register(r'category-products', CategoryProductsController, basename="category-products")
router.register(r'products', ProductController, basename="products")
router.register(r'customers', CustomerController, basename="customers")
router.register(r'type-customer', TypePersonController, basename="type-customer")
router.register(r'type-document', TypeDocumentController, basename="type-document")
router.register(r'sales', SalesController, basename="sales")

urlpatterns = router.urls
