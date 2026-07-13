#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Collecting static files..."
python manage.py collectstatic --no-input

echo "Running migrations..."
python manage.py migrate

# Seed data only if the db is empty (this uses the seed logic you already have)
echo "Seeding data..."
python manage.py shell -c "from learning.models import LearningCategory; exec(open('seed_data.py').read()) if not LearningCategory.objects.exists() else print('Learning seed data already present')"
python manage.py shell -c "from work.models import WorkProject; exec(open('seed_work.py').read()) if not WorkProject.objects.exists() else print('Work seed data already present')"

echo "Creating superuser..."
python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'admin123')"
