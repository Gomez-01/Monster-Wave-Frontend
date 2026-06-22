from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Drink(models.Model):
    name = models.CharField(max_length=200)
    flavor = models.CharField(max_length=200)
    sugarFree = models.BooleanField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    release = models.IntegerField()
    
class User(AbstractUser):
    
    def __str__(self):
        return f'{self.username}'