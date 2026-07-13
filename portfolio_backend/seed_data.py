"""
Seed script — run once:  python3 seed_data.py
"""
import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from learning.models import LearningCategory, LearningSkill, LearningPost

# ── Data Analytics ──────────────────────────────────────────────
da, _ = LearningCategory.objects.get_or_create(
    name="Data Analytics",
    defaults={
        "icon": "📊",
        "description": "Exploring data, building dashboards and deriving insights using Excel and Power BI.",
        "color": "#c2a4ff",
        "order": 1,
    }
)

skills_da = [
    ("Microsoft Excel", "intermediate", 70),
    ("Power BI", "intermediate", 60),
    ("Dashboard Design", "intermediate", 65),
    ("Data Cleaning", "beginner", 50),
    ("DAX Formulas", "beginner", 40),
]
for name, level, progress in skills_da:
    LearningSkill.objects.get_or_create(
        category=da, name=name,
        defaults={"level": level, "progress": progress}
    )

posts_da = [
    {
        "title": "Building My First Excel Dashboard",
        "summary": "Created a fully interactive sales dashboard in Excel using Pivot Tables, Slicers and conditional formatting.",
        "tags": "Excel,Dashboard,Pivot Tables",
    },
    {
        "title": "Power BI – From Zero to Dashboard",
        "summary": "Connected live data sources, designed a KPI dashboard with cards, bar charts and slicers in Power BI Desktop.",
        "tags": "Power BI,Dashboard,KPI,DAX",
    },
]
for p in posts_da:
    LearningPost.objects.get_or_create(category=da, title=p["title"], defaults=p)

print("✅ Seed data created successfully!")
print(f"   Category: {da.name}")
print(f"   Skills:   {da.skills.count()}")
print(f"   Posts:    {da.posts.count()}")
