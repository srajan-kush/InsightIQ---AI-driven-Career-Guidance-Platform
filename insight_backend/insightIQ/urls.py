from django.urls import path,include
from .views import register_user, user_login, user_logout
from .predictions import urls as prediction_urls

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('predictions/',include(prediction_urls),name="predictions"),
]