from rest_framework.serializers import HyperlinkedModelSerializer

from authapp.models import TodoUser


class TodoUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = TodoUser
        fields = ('username', 'first_name', 'last_name', 'email', 'password')
        # fields = '__all__'


class TodoUserCustomModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = TodoUser
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'is_superuser', 'is_staff',)
