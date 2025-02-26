from django.contrib import admin
from .models import CustomUser

# Register your models here.

@admin.register(CustomUser)
class UserAdmin(admin.ModelAdmin):
    model = CustomUser
    fields = ['username', 'first_name', 'last_name', 'email','date_joined', 'last_login']
    list_display = ['username', 'first_name', 'last_name', 'email','date_joined', 'last_login']
