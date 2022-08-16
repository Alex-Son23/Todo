from rest_framework import serializers
from rest_framework.relations import StringRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from projects.models import Project, Todo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    # users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(HyperlinkedModelSerializer):
    # user = serializers.StringRelatedField(many=True)
    # project = StringRelatedField()
    created = serializers.DateTimeField(format='%Y-%m-%d')
    updated = serializers.DateTimeField(format='%Y-%m-%d')

    class Meta:
        model = Todo
        # fields = '__all__'
        fields = ('url','text', 'created', 'updated', 'is_active', 'project', 'user',)