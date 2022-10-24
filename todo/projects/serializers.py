from rest_framework import serializers
from rest_framework.relations import StringRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from authapp.serializers import TodoUserModelSerializer
from projects.models import Project, Todo


class ProjectModelSerializer(ModelSerializer):
    # users = StringRelatedField(many=True)
    # users = TodoUserModelSerializer()

    class Meta:
        model = Project
        fields = ('id', 'name', 'url', 'users', )
        # fields = '__all__'


class GetProjectModelSerializer(ModelSerializer):
    users = StringRelatedField(many=True)
    # users = TodoUserModelSerializer()

    class Meta:
        model = Project
        fields = ('id', 'name', 'url', 'users', )


class TodoModelSerializer(ModelSerializer):

    class Meta:
        model = Todo
        # fields = '__all__'
        fields = ('text', 'user', 'project', )


class GetTodoModelSerializer(HyperlinkedModelSerializer):
    user = StringRelatedField()
    created = serializers.DateTimeField(format='%Y-%m-%d')
    updated = serializers.DateTimeField(format='%Y-%m-%d')

    class Meta:
        model = Todo
        # fields = '__all__'
        fields = ('id', 'url', 'text', 'created', 'updated', 'is_active', 'project', 'user',)