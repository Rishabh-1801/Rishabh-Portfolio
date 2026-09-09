#!/usr/bin/env bash
# Start-up script — runs AFTER build, at runtime.
# The internal Postgres host IS reachable here.
set -o errexit

echo "Running migrations..."
python manage.py migrate --no-input

echo "Seeding learning data..."
python manage.py shell -c "
from learning.models import LearningCategory
if not LearningCategory.objects.exists():
    exec(open('seed_data.py').read())
    print('Learning seed data inserted.')
else:
    print('Learning seed data already present — skipping.')
"

echo "Seeding work data..."
python manage.py shell -c "
from work.models import WorkProject
if not WorkProject.objects.exists():
    exec(open('seed_work.py').read())
    print('Work seed data inserted.')
else:
    print('Work seed data already present — skipping.')
"

echo "Creating superuser (if needed)..."
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('Superuser created.')
else:
    print('Superuser already exists — skipping.')
"

echo "Starting Gunicorn..."
exec gunicorn backend.wsgi:application \
    --bind 0.0.0.0:${PORT:-8000} \
    --workers 2 \
    --timeout 120
