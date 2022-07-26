from rest_framework.routers import DefaultRouter

from .controllers.CategoryProductsController import CategoryProductsController
from .controllers.EmployeeController import EmployeeController
from .controllers.ProductController import ProductController
from .controllers.CustomerController import CustomerController


appName = 'inventory'
router = DefaultRouter()

router.register(r'employees', EmployeeController, basename="employees")
router.register(r'category-products', CategoryProductsController, basename="category-products")
router.register(r'products', ProductController, basename="products")
router.register(r'customers', CustomerController, basename="customers")

urlpatterns = router.urls
