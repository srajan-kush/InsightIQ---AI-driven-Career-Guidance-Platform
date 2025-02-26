from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': False},  # Optional depending on your requirements
            'last_name': {'required': False},   # Optional depending on your requirements
        }

    def create(self, validated_data):
        # Extract the validated data for the user fields
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),  # Use .get() to avoid KeyError
            last_name=validated_data.get('last_name', '')     # Use .get() to avoid KeyError
        )
        
        # Set the password securely
        user.set_password(validated_data['password'])
        
        # Save the user instance to the database
        user.save()
        
        return user
