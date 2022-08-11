from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _


# Create your models here.
class TodoUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
