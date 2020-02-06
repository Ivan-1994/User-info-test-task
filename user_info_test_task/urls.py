# from django.urls import include, path
# from rest_framework import routers
# from user_info import views
#
# router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
#
# # Wire up our API using automatic URL routing.
# # Additionally, we include login URLs for the browsable API.
# urlpatterns = [
#     path('', include(router.urls)),
#     path('snippets/', views.SnippetList),
#     path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
# ]

from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.urlpatterns import format_suffix_patterns
from user_info import views

urlpatterns = [
    path('', views.redirect_to_index),
    path('users/', views.user_list, name='user_list'),
    path('users/<int:pk>', views.user_detail),
    path('api/users/', views.UserList.as_view()),
    path('api/users/<int:pk>', views.UserDetail.as_view()),
    path('api/users/<int:pk>/statistic/', views.UserDetailStatistic.as_view()),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
        + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = format_suffix_patterns(urlpatterns)
