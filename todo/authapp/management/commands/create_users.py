from django.core.management import BaseCommand
from django.utils.crypto import get_random_string

from authapp.models import TodoUser


class Command(BaseCommand):
    help = 'Создание пользователей!'

    def handle(self, *args, **options):
        # print(options)
        user = TodoUser.objects.filter(username='admin').first()

        print(user)
        if not user:
            TodoUser.objects.create_superuser(username='admin', email='admin@admin.admin', password='123')
            for i in range(5):
                user_name = get_random_string(10)
                first_name = get_random_string(15)
                last_name = get_random_string(10)
                email = f'{get_random_string(10)}@{get_random_string(5)}.{get_random_string(3)}'
                print(f'{user_name}\n{email}')

                TodoUser.objects.create_user(
                    username=user_name,
                    first_name=first_name,
                    last_name=last_name,
                    email=email,
                    password='123'
                )