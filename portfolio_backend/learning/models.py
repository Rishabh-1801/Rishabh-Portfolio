from django.db import models


class LearningCategory(models.Model):
    """Top-level skill domain, e.g. 'Data Analytics', 'Video Editing'"""
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=100, blank=True, help_text="Emoji or icon name")
    description = models.TextField(blank=True)
    color = models.CharField(max_length=20, default="#c2a4ff",
                             help_text="Accent colour in CSS hex format")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name_plural = "Learning Categories"

    def __str__(self):
        return self.name


class LearningSkill(models.Model):
    """A specific skill / tool learnt within a category"""
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    category = models.ForeignKey(LearningCategory, on_delete=models.CASCADE,
                                 related_name='skills')
    name = models.CharField(max_length=100)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='beginner')
    progress = models.PositiveIntegerField(default=0, help_text="Progress 0-100")
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-progress']

    def __str__(self):
        return f"{self.category.name} → {self.name}"


class LearningPost(models.Model):
    """A blog-style learning update / note"""
    category = models.ForeignKey(LearningCategory, on_delete=models.CASCADE,
                                 related_name='posts')
    title = models.CharField(max_length=200)
    summary = models.TextField(help_text="Short one-liner shown on the card")
    content = models.TextField(blank=True, help_text="Full details (optional)")
    tags = models.CharField(max_length=300, blank=True,
                            help_text="Comma-separated tags, e.g. Excel,Dashboard,Power BI")
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def tags_list(self):
        return [t.strip() for t in self.tags.split(',') if t.strip()]
