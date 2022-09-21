from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from projects.filters import ProjectFilter, TodoFilter
from projects.models import Project, Todo
from projects.serializers import ProjectModelSerializer, TodoModelSerializer

# class OwnerOnly(BasePermission):
#     def has_permission(self, request, view):
#         # if request.user == request.project.id:
#         #     print(request)
#         #     return True
#         # else:
#         #     return False
#         print(request, request.user, request.current_app)
#         return True


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter
    # print(queryset)
    # permission_classes = [OwnerOnly]


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    filterset_class = TodoFilter

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.is_active = False
            instance.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
        # return Response(status=status.HTTP_100_CONTINUE)
