from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from authapp.models import TodoUser
from authapp.serializers import TodoUserModelSerializer


# Create your views here.
class TodoUserModelViewSet(ModelViewSet):
    queryset = TodoUser.objects.all()
    serializer_class = TodoUserModelSerializer
