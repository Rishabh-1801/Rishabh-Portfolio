# Portfolio Backend — Django REST API

## 🚀 Run karvanu (First time / any time)

```bash
cd portfolio_backend
bash start.sh
```

Bas! Script khud j:
1. Python venv banave che
2. packages install kare che
3. DB migrate kare che
4. Admin user banave che
5. Seed data add kare che
6. Server start kare che

---

## 📡 API Endpoints

| URL | Description |
|-----|-------------|
| `GET /api/learning/` | All categories with skills + posts |
| `GET /admin/` | Admin panel |

---

## 🔐 Admin Login

- **URL:** http://localhost:8000/admin/
- **Username:** `admin`
- **Password:** `admin123`

---

## ➕ Navi skill / category / post kevi rite add karvi?

1. Admin panel kholo: http://localhost:8000/admin/
2. **Learning Categories** → "Add" button
3. Category ni andar ja ne **Skills** add karo (name, level, progress %)
4. **Learning Posts** add karo (title, summary, tags)
5. Frontend ma auto show thashe — no code needed!

---

## 📁 File Structure

```
portfolio_backend/
├── backend/
│   ├── settings.py    ← Django settings
│   └── urls.py        ← Root URL config
├── learning/
│   ├── models.py      ← LearningCategory, LearningSkill, LearningPost
│   ├── views.py       ← GET /api/learning/
│   ├── serializers.py ← DRF serializers
│   ├── admin.py       ← Admin config
│   └── urls.py        ← App URL config
├── requirements.txt   ← Python packages
├── start.sh           ← One-click startup
└── seed_data.py       ← Initial data script
```

---

## 🔄 Manually run karvu hoy to

```bash
cd portfolio_backend
source venv/bin/activate        # venv activate
python manage.py runserver      # server start
```
