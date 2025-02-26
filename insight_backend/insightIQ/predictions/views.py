from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .job_prediction import get_career_suggestions
from .articles import get_article
from .chatbot import chat_with_gpt

@api_view(['GET'])
def job_prediction(request):    
    if request.method == 'GET' :
        skills = request.GET.get('skills','')
        interests = request.GET.get('interests','')

        job_dis = get_career_suggestions(skills, interests)

        return Response({'job_discription':job_dis},status=status.HTTP_200_OK)
    
    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
def chat_bot(request):    
    if request.method == 'GET' :
        prompt = request.GET.get('prompt','')

        bot_response = chat_with_gpt(prompt)

        return Response({'response':bot_response},status=status.HTTP_200_OK)
    
    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    

@api_view(['GET'])
def article_model(request):
    if request.method == 'GET':
        topic = request.GET.get('topic','')
        topic = topic.replace('-',' ')

        article = get_article(topic)

        if article:
            return Response({'article': article}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    