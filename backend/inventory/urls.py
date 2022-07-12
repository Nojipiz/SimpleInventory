from rest_framework.routers import DefaultRouter

from .controllers.CategoryProductsController import CategoryProductsController
from .controllers.EmployeeController import EmployeeController
from .controllers.ProductController import ProductController

appName = 'inventory'
router = DefaultRouter()

router.register(r'employees', EmployeeController, basename="employees")
router.register(r'category-products', CategoryProductsController, basename="category-products")
router.register(r'products', ProductController, basename="products")

urlpatterns = router.urls
