from django.db import models


class ContactMessage(models.Model):
    """Stores every contact-form submission from the portfolio site."""
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=250, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(
        default=False,
        help_text="Admin panel ma tick karo ek var vachi lyo pachi"
    )
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        return f"{self.name} <{self.email}> — {self.submitted_at:%d %b %Y %H:%M}"
