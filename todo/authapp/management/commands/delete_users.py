from django.core.management import BaseCommand
from django.utils.crypto import get_random_string

from authapp.models import TodoUser


class Command(BaseCommand):
    help = 'Удаление пользователей!'

    def handle(self, *args, **options):
        print(TodoUser.objects.all())
        users = TodoUser.objects.all()
        for user in users:
            if not user.is_superuser:
                print(user.delete())
        # TodoUser.objects.create_superuser(username='admin', email='admin@admin.admin', password='123')
        # for i in range(5):
        #     user_name = get_random_string(10)
        #     email = f'{get_random_string(10)}@{get_random_string(5)}.{get_random_string(3)}'
        #     print(f'{user_name}\n{email}')
        #
        #     TodoUser.objects.create_user(
        #         username=user_name,
        #         email=email,
        #         password='123'
        #     )