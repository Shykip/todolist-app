from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=100, default="")
    user_id = models.IntegerField(default=-1)
    description = models.TextField()
    due_date = models.DateField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username
    
    def user_exists(cls, username):
        return cls.objects.filter(username=username).exists()