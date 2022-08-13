from django.shortcuts import render
from djangorestframework_camel_case.parser import CamelCaseJSONParser
from rest_framework import parsers
from rest_framework.viewsets import ModelViewSet
from authapp.models import TodoUser
from authapp.serializers import TodoUserModelSerializer


# Create your views here.
class NoUnderscoreBeforeNumberCamelCaseJSONParser(CamelCaseJSONParser):
    json_underscoreize = {'no_underscore_before_number': True}


class TodoUserModelViewSet(ModelViewSet):
    queryset = TodoUser.objects.all()
    serializer_class = TodoUserModelSerializer
    parser_classes = (NoUnderscoreBeforeNumberCamelCaseJSONParser, parsers.MultiPartParser, parsers.JSONParser)

