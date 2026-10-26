from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
)
from rest_framework import viewsets
from accounts.models import Profile
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .permissions import IsOwnerOrReadOnly
from .paginations import DefaultPagination
from .serializers import PostSerializer, CategorySerializer
from ...models import Post, Category


class PostModelViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    serializer_class = PostSerializer
    queryset = Post.objects.filter(status=True).order_by("-published_date")
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ["title", "content"]
    ordering_fields = ["published_date"]
    filterset_fields = {
        "category": ["in", "exact"],
        "author": ["exact"],
        "status": ["exact"],
    }
    pagination_class = DefaultPagination

    def perform_create(self, serializer):
        profile = Profile.objects.get(user=self.request.user)
        serializer.save(author=profile)


class CategoryModelViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
