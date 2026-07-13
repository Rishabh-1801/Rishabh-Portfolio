from django.contrib import admin
from .models import LearningCategory, LearningSkill, LearningPost


class LearningSkillInline(admin.TabularInline):
    model = LearningSkill
    extra = 1


class LearningPostInline(admin.StackedInline):
    model = LearningPost
    extra = 0
    fields = ('title', 'summary', 'tags', 'is_published')


@admin.register(LearningCategory)
class LearningCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon', 'color', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    inlines = [LearningSkillInline, LearningPostInline]


@admin.register(LearningSkill)
class LearningSkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'level', 'progress', 'is_active')
    list_filter = ('category', 'level')
    list_editable = ('progress', 'is_active')


@admin.register(LearningPost)
class LearningPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_published', 'created_at')
    list_filter = ('category', 'is_published')
    search_fields = ('title', 'summary', 'tags')
