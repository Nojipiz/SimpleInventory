from django.urls import path

from .controllers.EmployeeController import EmployeeCreate, EmployeeDetail

urlpatterns = [
    path('users/', EmployeeDetail.as_view()),
    path('users/create', EmployeeCreate.as_view()),
]