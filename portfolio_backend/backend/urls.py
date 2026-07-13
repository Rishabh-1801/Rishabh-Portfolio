from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('learning.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/work/', include('work.urls')),
]
