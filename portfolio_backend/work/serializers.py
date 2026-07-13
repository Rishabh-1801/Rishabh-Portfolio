from rest_framework import serializers
from .models import WorkProject

class WorkProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkProject
        fields = '__all__'
