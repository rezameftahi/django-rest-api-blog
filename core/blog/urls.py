from django.urls import path, include
from . import views
from django.views.generic import TemplateView

app_name = "blog"
urlpatterns = [
    # path('', indexView, name="fbv-index"),
    path("post/", views.PostListView.as_view(), name="post-list"),
    path(
        "cbv-index",
        TemplateView.as_view(
            template_name="index.html", extra_context={"name": "Reza"}
        ),
    ),
    # path('cbv-index', views.IndexView.as_view(), name='cbv-index'),
    path("post/<int:pk>/", views.PostDetailView.as_view(), name="post-detail"),
    path("post/create/", views.PostCreateView.as_view(), name="post-create"),
    path(
        "post/<int:pk>/update/",
        views.PostUpdateView.as_view(),
        name="post-update",
    ),
    path(
        "post/<int:pk>/delete/",
        views.PostDeleteView.as_view(),
        name="post-delete",
    ),
    # path('post/', views.api_post_list_view, name='api-post-list'),
    path("api/v1/", include("blog.api.v1.urls")),
]
