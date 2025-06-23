from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Tag, Post
from django.utils.html import strip_tags


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')
        ref_name = 'BlogUserSerializer'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'description')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug')
        ref_name = 'BlogTag'


class PostListSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = (
            'id',
            'title',
            'slug',
            'author',
            'category',
            'tags',
            'excerpt',
            'image',
            'status',
            'featured',
            'views',
            'created',
            'updated'
        )


class PostDetailSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = (
            'id',
            'title',
            'slug',
            'author',
            'category',
            'tags',
            'content',
            'excerpt',
            'image',
            'status',
            'featured',
            'views',
            'created',
            'updated'
        )


class PostCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = (
            'title',
            'category',
            'tags',
            'content',
            'image',
            'status',
            'featured'
        ) 