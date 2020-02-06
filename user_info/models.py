from django.db import models


class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    gender = models.CharField(max_length=50)
    ip_address = models.CharField(max_length=50)


class Statistic(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='statistic')
    date = models.DateField()
    page_views = models.IntegerField()
    clicks = models.IntegerField()
