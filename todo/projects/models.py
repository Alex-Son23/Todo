from django.db import models
from django.utils.timezone import now

from authapp.models import TodoUser
from datetime import datetime


# Create your models here.
class Project(models.Model):
    name = models.CharField(verbose_name='Name of project', max_length=64)
    url = models.URLField(verbose_name='URL to repository')
    users = models.ManyToManyField(TodoUser)


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(max_length=1024)
    created = models.DateTimeField(verbose_name='создан', auto_now_add=True)
    updated = models.DateTimeField(verbose_name='изменён', auto_now=True)
    is_active = models.BooleanField(default=True)
    user = models.ForeignKey(TodoUser, on_delete=models.CASCADE)

    class Meta:
        ordering = ['id']
