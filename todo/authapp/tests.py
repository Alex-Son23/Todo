from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase

from authapp.models import TodoUser


# Create your tests here.
class TestTodoUserViewSet(APITestCase):

    def setUp(self) -> None:
        self.url = '/api/users/'

    def test_create_update_delete_user(self):
        admin = TodoUser.objects.create_superuser('admin', 'admin@admin.com', '1')
        user = mixer.blend(TodoUser)
        print(user)
        self.client.login(username='admin', password='1')
        # response = self.client.put(f'{self.url}{user.id}',
        #                            {'username': user.username, 'email': user.email, 'password': user.password},
        #                            follow=True)
        # self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.put(f'{self.url}{1}',
                                   {'username': 'hell', 'email': 'asd@user.email', 'password': 'user.password'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get(f'{self.url}')

        user = TodoUser.objects.get(id=user.id)
        self.assertEqual(user.username, 'hell')

    def tearDown(self) -> None:
        pass
