from django.http import HttpResponse

def HomePage(request):
    return HttpResponse('<h3>Welcome to the home page</h3>')
