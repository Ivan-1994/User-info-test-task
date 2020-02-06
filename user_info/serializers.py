from user_info.models import User, Statistic
from rest_framework import serializers


class StatisticSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Statistic
        fields = ['page_views', 'clicks', 'date']
        ordering = ['-date']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    statistic = StatisticSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'gender', 'ip_address', 'statistic']
        ordering = ['-id']