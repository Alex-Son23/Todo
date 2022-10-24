from django.contrib import admin

# Register your models here.
from projects.models import Todo, Project

admin.site.register(Todo)
admin.site.register(Project)