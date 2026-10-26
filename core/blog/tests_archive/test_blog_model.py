from django.test import TestCase
from datetime import datetime

from ..models import Post, Category
from accounts.models import User, Profile


class testPostmodel(TestCase):
    def setUp(self):
        self.category_obj = Category.objects.create(name="hello")
        self.user = User.objects.create_user(
            email="tets@test.com", password="2/123456@m"
        )
        self.profile = Profile.objects.create(
            user=self.user,
            first_name="Reza",
            last_name="Meftahi",
            description="test",
        )

    def test_create_post_with_valid_data(self):

        post = Post.objects.create(
            author=self.profile,
            title="test",
            content="descriptoin",
            status=True,
            category=self.category_obj,
            published_date=datetime.now(),
        )
        self.assertTrue(Post.objects.filter(pk=post.id).exists())
