from django.urls import path
from .views import TaskView, TaskCreate, TaskUpdate, UserView,  UserCreate, UserUpdate, TaskDelete


urlpatterns = [
    path('task/', TaskView.as_view()),
    path('task/<int:pk>/', TaskUpdate.as_view()),
    path('task/create/', TaskCreate.as_view()),
    path('task/<int:pk>/delete/', TaskDelete.as_view(), name='task-delete'),

    path('user/', UserView.as_view()),
    path('user/<int:pk>/', UserUpdate.as_view()),
    path('user/create/', UserCreate.as_view()),
]