from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Drink
from .serializers import *


class DrinkViewSet(viewsets.ModelViewSet):
    queryset = Drink.objects.all().order_by("-id")
    serializer_class = DrinkSerializer
 


class RegisterView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    
    permission_classes = [AllowAny]