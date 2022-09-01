from django_filters import rest_framework as filters

from projects.models import Project, Todo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class TodoFilter(filters.FilterSet):
    # name = filters.CharFilter(lookup_expr='contains')
    created = filters.DateFromToRangeFilter()

    class Meta:
        model = Todo
        fields = ['project', 'created']