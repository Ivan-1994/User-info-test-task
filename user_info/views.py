from django.shortcuts import render, redirect
from user_info.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from user_info.serializers import UserSerializer, StatisticSerializer
from django.http import Http404


def redirect_to_index(request):
    return redirect('/users/')


def user_list(request):
    return render(request, 'user_info/user_list.html')


def user_detail(request, pk):
    return render(request, 'user_info/user_detail.html', context={'pk': pk})


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UserDetailStatistic(APIView):
    def get_object(self, pk, date1, date2):
        try:
            return User.objects.get(pk=pk).statistic.filter(date__range=[date1, date2])
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        if request.GET:
            user = self.get_object(pk, request.GET['date1'], request.GET['date2'])
            serializer = StatisticSerializer(user, many=True)
            return Response(serializer.data)
