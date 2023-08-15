from django.shortcuts import render
from rest_framework import generics
from .serializers import TaskSerializer, UserSerializer
from .models import Task, User
from django.http import JsonResponse

# Create your views here.
class TaskView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskCreate(generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class TaskUpdate(generics.RetrieveUpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer



class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserUpdate(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

def register_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        if User.user_exists(username):
            return JsonResponse({'message': 'User already exists'}, status=400)
    return render(request, 'register.html')