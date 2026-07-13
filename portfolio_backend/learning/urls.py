from django.urls import path
from .views import learning_list

urlpatterns = [
    path('learning/', learning_list, name='learning-list'),
]
