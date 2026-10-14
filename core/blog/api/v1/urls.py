from django.urls import path, include
from . import views
from django.views.generic import TemplateView
app_name = "api-v1"
urlpatterns = [
    path('post/', views.postList, name='post-list'),
    path('post/<int:id>/', views.postDetail, name='post-detail'),
]