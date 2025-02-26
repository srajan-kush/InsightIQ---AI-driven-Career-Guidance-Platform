from django.urls import path
from .views import job_prediction,article_model,chat_bot

urlpatterns = [
    path('job_prediction/',job_prediction,name="job_prediction"),
    path('article/',article_model,name="article"),
    path('chat_bot/',chat_bot,name="chat_bot"),
]
