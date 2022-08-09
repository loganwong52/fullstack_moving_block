from pickle import FALSE
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .models import User

import requests
from requests_oauthlib import OAuth1
import pprint
import os
from dotenv import load_dotenv

load_dotenv()   # this func takes the variables from our .env file and adds them to os.environ
# print(os.environ)
# pp = pprint.PrettyPrinter(indent=2, depth=2)

def send_the_homepage(request):
    print('home!')
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)


def geturls(request, id):
    # this Noun API requires authentication... a public and private key
    auth = OAuth1(os.environ['apikey'], os.environ['secretkey'])

    # this is the route
    endpoint = f"http://api.thenounproject.com/icon/{id}"

    # pass endpoint and auth into .get() since this API database is protected
    response = requests.get(endpoint, auth=auth)
    responseJSON = response.json()
    # pp.pprint(responseJSON)
    
    icon_url = responseJSON['icon']['preview_url']    
    return HttpResponse(icon_url)


@api_view(['POST'])
def saveScore(request):
    name = request.data['name']
    score = request.data['score']

    try:
        # Create a user with the given name and score
        User.objects.create(name=name, score=score)
        return HttpResponse(f'{name} has been saved with score of {score}!')

    except Exception as e:
        print(str(e))

    return HttpResponse("An error has occurred in saveScore")


@api_view(['GET'])
def getScores(request):
    try:
        # Get all users and order their scores from greatest to least
        allUsers = User.objects.all().order_by('-score').values()
        data = list(allUsers)
        return JsonResponse({'data':data})

    except Exception as e:
        print(str(e))    

    return JsonResponse({'success': False})