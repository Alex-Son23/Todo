from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from rest_framework import status

from projects.models import Project
from projects.views import ProjectModelViewSet
from authapp.models import TodoUser


# Create your tests here.
class TestProjectViewSet(TestCase):

    def setUp(self) -> None:
        self.url = '/api/project/'

    def test_get_projects_factory(self):
        factory = APIRequestFactory()
        admin = TodoUser.objects.create_superuser('admin', 'admin@admin.com', '1')
        request = factory.get(self.url)
        # print(self.url)
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        # print(response.data, '1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project_client(self):
        client = APIClient()
        project = mixer.blend(Project)
        admin = TodoUser.objects.create_superuser(username='admin', email='admin@admin.com', password='123')
        client.login(username='admin', password='123')
        response = client.put(f'/api/project/{project.id}',
                              {'name': project.name,
                               'url': 'хоть я тут и меняю значение, но когда я проверяю данные запроса мне выводит данные из переменной project',
                               'users': project.users}, follow=True)



        # print(response.data, '2')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def tearDown(self) -> None:
        pass
