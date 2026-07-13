from django.contrib import admin
from .models import WorkProject

@admin.register(WorkProject)
class WorkProjectAdmin(admin.ModelAdmin):
    list_display = ('number', 'name', 'category', 'order')
    list_editable = ('order',)
    search_fields = ('name', 'category', 'tech')
