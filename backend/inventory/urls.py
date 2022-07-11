from rest_framework.routers import DefaultRouter

from .controllers.EmployeeController import EmployeeViewSet

appName = 'inventory'
router = DefaultRouter()

router.register(r'employees', EmployeeViewSet, basename="employees")

urlpatterns = router.urls
