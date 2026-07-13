from rest_framework import generics
from .models import WorkProject
from .serializers import WorkProjectSerializer

class WorkProjectListAPIView(generics.ListAPIView):
    queryset = WorkProject.objects.all()
    serializer_class = WorkProjectSerializer
