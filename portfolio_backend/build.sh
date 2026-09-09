#!/usr/bin/env bash
# Build phase — NO database access here.
# The internal Postgres host is only reachable at runtime, not during build.
set -o errexit

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Collecting static files..."
python manage.py collectstatic --no-input

echo "Build complete. DB setup will run at startup via start.sh"
