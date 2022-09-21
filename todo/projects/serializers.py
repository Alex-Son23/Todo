from rest_framework import serializers
from rest_framework.relations import StringRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from authapp.serializers import TodoUserModelSerializer
from projects.models import Project, Todo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    # users = StringRelatedField(many=True)
    # users = TodoUserModelSerializer()

    class Meta:
        model = Project
        fields = ('id', 'name', 'url', 'users', )
        # fields = '__all__'


class TodoModelSerializer(HyperlinkedModelSerializer):
    # user = serializers.StringRelatedField(many=True)
    # project = StringRelatedField()
    user = TodoUserModelSerializer()
    created = serializers.DateTimeField(format='%Y-%m-%d')
    updated = serializers.DateTimeField(format='%Y-%m-%d')
    # print(userz)

    class Meta:
        model = Todo
        # fields = '__all__'
        fields = ('url', 'text', 'created', 'updated', 'is_active', 'project', 'user',)