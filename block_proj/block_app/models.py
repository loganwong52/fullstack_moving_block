from django.db import models

class User(models.Model):
    name = models.CharField(max_length=255, default='user')
    score = models.IntegerField(default=0)