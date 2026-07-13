from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'submitted_at', 'is_read')
    list_filter = ('is_read',)
    list_editable = ('is_read',)
    search_fields = ('name', 'email', 'subject', 'message')
    date_hierarchy = 'submitted_at'
    readonly_fields = ('name', 'email', 'subject', 'message', 'submitted_at')
    ordering = ('-submitted_at',)
    list_per_page = 25
