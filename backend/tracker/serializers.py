from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import *



class DrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = ["id", "name", "flavor", "sugarFree", "price", "release"]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
 
    class Meta:
        model = User
        fields = ["id", "username", "password"]
 
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nome de usuário já está em uso.")
        return value
 
    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )
 
