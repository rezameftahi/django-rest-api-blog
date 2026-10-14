from django.shortcuts import render
from .models import Post
from .forms import PostForm
from django.http import HttpResponse
from django.views.generic import TemplateView, ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.
def indexView(request):
    return render(request, "index.html")

class IndexView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["name"] = "Re7a"
        context["posts"] = Post.objects.all()
        return context


class PostListView(ListView):
    #queryset = Post.objects.all()
    context_object_name = 'posts'
    paginate_by = 6
    
    def get_queryset(self):
        return Post.objects.filter(status=True).order_by('-published_date')

class PostDetailView(DetailView):
    model = Post


class PostCreateView(LoginRequiredMixin, PermissionRequiredMixin, CreateView):
    permission_required = 'blog.add_post'
    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)
    
    model = Post
    fields = [  'title', 'content', 'status', 'category', 'published_date']
    success_url = '/blog/post'

class PostUpdateView(LoginRequiredMixin, UpdateView):
    model = Post
    form_class = PostForm
    success_url = '/blog/post/'

class PostDeleteView(LoginRequiredMixin, DeleteView):
    model = Post
    success_url = '/blog/post'

@api_view()
def api_post_list_view(request):
    return Response("ok")