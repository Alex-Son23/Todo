from rest_framework.authtoken import serializers
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

    class Meta:
        model = Todo
        fields = '__all__'