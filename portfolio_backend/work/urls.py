from django.urls import path
from .views import WorkProjectListAPIView

urlpatterns = [
    path('', WorkProjectListAPIView.as_view(), name='work-list'),
]
