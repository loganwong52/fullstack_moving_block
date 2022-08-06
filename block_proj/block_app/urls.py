from . import views
from django.urls import path

urlpatterns = [
    path('', views.send_the_homepage),
    path('wish/<int:id>/', views.wish)
]