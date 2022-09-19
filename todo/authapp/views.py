from rest_framework import mixins
from django.shortcuts import render
from djangorestframework_camel_case.parser import CamelCaseJSONParser
from rest_framework import parsers
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from authapp.models import TodoUser
from authapp.serializers import TodoUserModelSerializer, TodoUserCustomModelSerializer


# Create your views here.
class NoUnderscoreBeforeNumberCamelCaseJSONParser(CamelCaseJSONParser):
    json_underscoreize = {'no_underscore_before_number': True}


# class TodoUserModelViewSet(ModelViewSet):
#     queryset = TodoUser.objects.all()
#     serializer_class = TodoUserModelSerializer
#     parser_classes = (NoUnderscoreBeforeNumberCamelCaseJSONParser, parsers.MultiPartParser, parsers.JSONParser)

class TodoUserCustomViewSet(mixins.ListModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.CreateModelMixin,
                            GenericViewSet):
    queryset = TodoUser.objects.all()
    serializer_class = TodoUserModelSerializer
    parser_classes = (NoUnderscoreBeforeNumberCamelCaseJSONParser, parsers.MultiPartParser, parsers.JSONParser)

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return TodoUserCustomModelSerializer
        return TodoUserModelSerializer
