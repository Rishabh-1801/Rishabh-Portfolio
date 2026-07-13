import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from work.models import WorkProject

projects = [
  {
    "number": "01",
    "name": "OmnexaAI",
    "category": "Company Website",
    "description": "A modern, fully responsive company website with Django backend, Bootstrap 5 frontend, and particles.js animations.",
    "tech": "Python · Django · Bootstrap 5 · JavaScript · HTML · CSS",
    "link": "https://omnexaai.com",
    "image": "/images/omnexaai.png",
    "order": 0
  },
  {
    "number": "02",
    "name": "Personal Portfolio v1",
    "category": "Portfolio Website",
    "description": "My first personal portfolio — responsive, clean, and professional with smooth scroll animations.",
    "tech": "HTML5 · CSS3 · Bootstrap 5 · JavaScript · AOS.js",
    "link": "#",
    "image": "/images/portfolio-3d.png",
    "order": 1
  },
  {
    "number": "03",
    "name": "Sokhda Nagrik Mandal",
    "category": "Mobile Application",
    "description": "A community-focused mobile application currently in development using Flutter, designed to connect and serve the members of Sokhda Nagrik Mandal.",
    "tech": "Flutter · Dart · Cross-platform Development",
    "link": "#",
    "image": "/images/placeholder.webp",
    "order": 2
  },
]

for p in projects:
    WorkProject.objects.get_or_create(number=p['number'], defaults=p)

print("Work projects seeded successfully.")
