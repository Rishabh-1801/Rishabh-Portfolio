from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ContactMessage


@api_view(['POST'])
def contact_submit(request):
    """
    POST /api/contact/
    Body: { name, email, subject, message }
    Saves submission to DB — visible in Django admin under Contact Messages.
    """
    data = request.data
    name    = (data.get('name')    or '').strip()
    email   = (data.get('email')   or '').strip()
    subject = (data.get('subject') or '').strip()
    message = (data.get('message') or '').strip()

    if not name or not email or not message:
        return Response(
            {'error': 'name, email and message are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    ContactMessage.objects.create(
        name=name,
        email=email,
        subject=subject,
        message=message,
    )
    return Response({'success': True}, status=status.HTTP_201_CREATED)
