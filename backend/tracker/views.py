from rest_framework import viewsets

from .models import Drink
from .serializers import DrinkSerializer


class DrinkViewSet(viewsets.ModelViewSet):
    queryset = Drink.objects.all().order_by("-id")
    serializer_class = DrinkSerializer
