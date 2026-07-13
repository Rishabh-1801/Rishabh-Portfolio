from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import LearningCategory
from .serializers import LearningCategorySerializer


@api_view(['GET'])
def learning_list(request):
    """Return all active learning categories with their skills and posts."""
    categories = LearningCategory.objects.filter(is_active=True)
    serializer = LearningCategorySerializer(categories, many=True)
    return Response(serializer.data)
