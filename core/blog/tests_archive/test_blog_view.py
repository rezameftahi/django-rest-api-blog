from django.test import TestCase, Client
from datetime import datetime
from django.urls import reverse

from accounts.models import User, Profile
from ..models import Post, Category


class TestBlogView(TestCase):

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            email="tets@test.com", password="2/123456@m"
        )
        self.category_obj = Category.objects.create(name="hello")
        self.profile = Profile.objects.create(
            user=self.user,
            first_name="Reza",
            last_name="Meftahi",
            description="test",
        )

        self.post = Post.objects.create(
            author=self.profile,
            title="test",
            content="descriptoin",
            status=True,
            category=self.category_obj,
            published_date=datetime.now(),
        )

    def test_blog_index_url_successful_response(self):
        url = reverse("blog:post-list")
        respponse = self.client.get(url)
        self.assertEqual(respponse.status_code, 200)

    def test_blog_post_detail_logged_in_response(self):
        self.client.force_login(self.user)
        url = reverse("blog:post-detail", kwargs={"pk": self.post.id})
        respponse = self.client.get(url)
        self.assertEqual(respponse.status_code, 200)

    # def test_blog_post_detail_anonymouse_response(self):
    #     url=reverse('blog:post-detail', kwargs={'pk':self.post.id})
    #     respponse=self.client.get(url)
    #     self.assertEqual(respponse.status_code,302)
