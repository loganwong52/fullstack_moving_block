from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view

import requests
from requests_oauthlib import OAuth1
import pprint
import os
from dotenv import load_dotenv

load_dotenv()   # this func takes the variables from our .env file and adds them to os.environ
print(os.environ)
pp = pprint.PrettyPrinter(indent=2, depth=2)

def send_the_homepage(request):
    print('home!')
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)


def wish(request, id):
    # this Noun API requires authentication... a public and private key
    auth = OAuth1(os.environ['apikey'], os.environ['secretkey'])

    # this is the route
    endpoint = f"http://api.thenounproject.com/icon/{id}"

    # you're now passing 2 args to .get(). The route, as well as the auth, since 
    # this API database is more protected, we need to use backend to access it
    response = requests.get(endpoint, auth=auth)
    responseJSON = response.json()
    # pp.pprint(responseJSON)
    
    icon_url = responseJSON['icon']['preview_url']
    # print(icon_url)
    
    return HttpResponse(icon_url)