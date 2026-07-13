#!/bin/bash
# ═══════════════════════════════════════════════
#  Portfolio Backend — One-click Setup & Run
#  Usage:  bash start.sh
# ═══════════════════════════════════════════════

set -e   # exit on any error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║  Portfolio Backend  •  Django Setup  ║"
echo "╚══════════════════════════════════════╝"
echo ""

# ── 1. Python check ──────────────────────────
if ! command -v python3 &>/dev/null; then
  echo "❌  python3 not found. Please install Python 3.10+."
  exit 1
fi
echo "✅  Python  → $(python3 --version)"

# ── 2. Virtual environment ───────────────────
VENV_DIR="$SCRIPT_DIR/venv"

if [ ! -d "$VENV_DIR" ]; then
  echo "🔧  Creating virtual environment…"
  python3 -m venv "$VENV_DIR"
  echo "✅  venv created at: $VENV_DIR"
else
  echo "✅  venv already exists"
fi

# Activate venv
source "$VENV_DIR/bin/activate"
echo "✅  venv activated"

# ── 3. Install dependencies ──────────────────
echo ""
echo "📦  Installing dependencies from requirements.txt…"
pip install -q --upgrade pip
pip install -q -r requirements.txt
echo "✅  All packages installed"

# ── 4. Migrations ────────────────────────────
echo ""
echo "🗄️   Running migrations…"
python manage.py migrate --run-syncdb 2>&1 | grep -v "^$" || true
echo "✅  Database ready"

# ── 5. Admin superuser (skip if exists) ──────
echo ""
echo "👤  Checking admin user…"
python - <<'PYEOF'
import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@portfolio.com', 'admin123')
    print("   Created  →  admin / admin123")
else:
    print("   Already exists  →  admin / admin123")
PYEOF

# ── 6. Seed demo data (skip if already seeded) ───
echo ""
echo "🌱  Checking seed data…"
python - <<'PYEOF'
import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
from learning.models import LearningCategory
if not LearningCategory.objects.exists():
    exec(open('seed_data.py').read())
else:
    print("   Seed data already present — skipping")
PYEOF

# ── 7. Start server ───────────────────────────
echo ""
echo "╔══════════════════════════════════════╗"
echo "║  🚀  Server starting…                ║"
echo "║                                      ║"
echo "║  API  →  http://127.0.0.1:8000/api/ ║"
echo "║           /api/learning/             ║"
echo "║  Admin→  http://127.0.0.1:8000/admin║"
echo "║           admin  /  admin123         ║"
echo "╚══════════════════════════════════════╝"
echo ""

python manage.py runserver 8000
