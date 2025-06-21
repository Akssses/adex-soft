from django.shortcuts import render
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from django.db.models import F
from .models import Category, Tag, Post
from .serializers import (
    CategorySerializer,
    TagSerializer,
    PostListSerializer,
    PostDetailSerializer,
    PostCreateUpdateSerializer
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content']
    ordering_fields = ['created', 'views', 'title']
    ordering = ['-created']
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = Post.objects.all()
        
        # Фильтрация по категории
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__slug=category)
        
        # Фильтрация по тегам
        tags = self.request.query_params.getlist('tags', None)
        if tags:
            queryset = queryset.filter(tags__slug__in=tags).distinct()
        
        # Фильтрация по статусу
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        
        # Фильтрация избранных постов
        featured = self.request.query_params.get('featured', None)
        if featured:
            queryset = queryset.filter(featured=True)
        
        return queryset
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PostListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return PostCreateUpdateSerializer
        return PostDetailSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    @action(detail=True, methods=['post'])
    def increment_views(self, request, slug=None):
        post = self.get_object()
        post.views = F('views') + 1
        post.save()
        return Response({'status': 'views incremented'})
    
    @action(detail=False)
    def featured(self, request):
        featured_posts = Post.objects.filter(featured=True)
        serializer = PostListSerializer(featured_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False)
    def by_category(self, request):
        category_slug = request.query_params.get('category', None)
        if category_slug:
            posts = Post.objects.filter(category__slug=category_slug)
            serializer = self.get_serializer(posts, many=True)
            return Response(serializer.data)
        return Response(
            {'error': 'category parameter is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
