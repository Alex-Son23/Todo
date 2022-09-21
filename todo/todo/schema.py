import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType

from authapp.models import TodoUser
from projects.models import Todo, Project


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoUserType(DjangoObjectType):
    class Meta:
        model = TodoUser
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(ObjectType):
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(TodoUserType)
    all_todo = graphene.List(TodoType)

    user_by_id = graphene.Field(TodoUserType, id=graphene.Int(required=True))

    projects_by_user_id = graphene.List(ProjectType, id=graphene.Int(required=True))

    def resolve_projects_by_user_id(self, info, id=None):
        projects = Project.objects.all()
        print(projects)
        if id:
            projects = projects.filter(users__id=id)
        return projects

    def resolve_user_by_id(self, info, id):
        try:
            return TodoUser.objects.get(id=id)
        except TodoUser.DoesNotExist:
            return None

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return TodoUser.objects.all()

    def resolve_all_todo(root, info):
        return Todo.objects.all()


# mutation

class TodoUserCreateMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        email = graphene.String()
        password = graphene.String()

    user = graphene.Field(TodoUserType)

    @classmethod
    def mutate(cls, info, **kwargs):
        user = TodoUser.objects.create(**kwargs)
        return cls(user=user)


# class TodoUserDeleteMutation(graphene.Mutation):
#     pass


class TodoUserUpdateMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        id = graphene.ID()

    user = graphene.Field(TodoUserType)

    @classmethod
    def mutate(cls, root, info, username, id):
        user = TodoUser.objects.get(pk=id)
        user.username = username
        return TodoUserUpdateMutation(user=user)


class Mutation(graphene.ObjectType):
    create_user = TodoUserCreateMutation.Field()
    # update_user = TodoUserUpdateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
