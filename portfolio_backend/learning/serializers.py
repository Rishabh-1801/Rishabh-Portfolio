from rest_framework import serializers
from .models import LearningCategory, LearningSkill, LearningPost


class LearningSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningSkill
        fields = ['id', 'name', 'level', 'progress']


class LearningPostSerializer(serializers.ModelSerializer):
    tags_list = serializers.ReadOnlyField()

    class Meta:
        model = LearningPost
        fields = ['id', 'title', 'summary', 'content', 'tags', 'tags_list',
                  'created_at', 'updated_at']


class LearningCategorySerializer(serializers.ModelSerializer):
    skills = LearningSkillSerializer(many=True, read_only=True)
    posts = LearningPostSerializer(many=True, read_only=True,
                                   source='posts_published')

    class Meta:
        model = LearningCategory
        fields = ['id', 'name', 'icon', 'description', 'color', 'order',
                  'skills', 'posts']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        # Filter only active skills and published posts
        rep['skills'] = LearningSkillSerializer(
            instance.skills.filter(is_active=True), many=True
        ).data
        rep['posts'] = LearningPostSerializer(
            instance.posts.filter(is_published=True), many=True
        ).data
        return rep
