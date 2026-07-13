from django.db import models

class WorkProject(models.Model):
    number = models.CharField(max_length=10, help_text="e.g. 01, 02")
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, help_text="e.g. Company Website")
    description = models.TextField()
    tech = models.CharField(max_length=200, help_text="Tools and features, e.g. Python · Django · Bootstrap 5")
    link = models.URLField(blank=True, null=True, help_text="Link to live project or #")
    image = models.CharField(max_length=255, help_text="Path to image, e.g. /images/omnexaai.png")
    order = models.IntegerField(default=0, help_text="Determines the display order (0 is first)")

    class Meta:
        ordering = ['order', 'number']
        verbose_name = "Work Project"
        verbose_name_plural = "Work Projects"

    def __str__(self):
        return f"{self.number} - {self.name}"
