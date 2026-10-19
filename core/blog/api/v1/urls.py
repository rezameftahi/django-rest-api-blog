from django.urls import path, include
from . import views
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

app_name = "api-v1"



router = DefaultRouter()
router.register("post", views.PostModelViewSet, basename="post")
router.register("category", views.CategoryModelViewSet, basename="category")

urlpatterns = [
    path("", include(router.urls)),
]






# router = DefaultRouter()
# router.register('post',views.PostModelViewSet, basename='post')
# router.register('category',views.CategoryModelViewSet, basename='category')
# urlpatterns = router.urls

# urlpatterns = [
#    path('swagger.<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
#    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
#    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
#    ...
# ]


# urlpatterns = [
    # path('post/', views.postList, name='post-list'),
    # path('post/<int:id>/', views.postDetail, name='post-detail'),
    # path('post/', views.PostList.as_view(), name='post-list'),
    # path('post/<int:pk>/', views.PostDetail.as_view(), name='post-detail'),
#     path('post/', views.PostViewSet.as_view({'get':'list'}),name='post-list'),
#     path('post/<int:pk>/', views.PostViewSet.as_view({'get':'retrieve'}),name='post-detail'),
# ]
