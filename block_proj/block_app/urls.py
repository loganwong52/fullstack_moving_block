from . import views
from django.urls import path

urlpatterns = [
    path('', views.send_the_homepage),
    path('geturls/<int:id>/', views.geturls),
    path('saveScore', views.saveScore)
]