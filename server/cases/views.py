from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAdminUser
from django.db.models import Q
import json
from .models import Case, Tag, Service, Stack
from .serializers import (
    CaseSerializer,
    CaseCreateSerializer,
    TagSerializer,
    ServiceSerializer,
    StackSerializer,
)

# Create your views here.

class CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all()
    permission_classes = [AllowAny]  # Default permission for all actions
    
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return CaseCreateSerializer
        return CaseSerializer

    def create(self, request, *args, **kwargs):
        # Get JSON data from the request
        data = json.loads(request.data.get('data', '{}'))
        
        # Add files to the data
        if 'client_avatar' in request.FILES:
            data['client_avatar'] = request.FILES['client_avatar']
        
        if 'images' in request.FILES:
            data['images'] = request.FILES.getlist('images')

        # Create serializer with the combined data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        # Get JSON data from the request
        data = json.loads(request.data.get('data', '{}'))
        
        # Add files to the data
        if 'client_avatar' in request.FILES:
            data['client_avatar'] = request.FILES['client_avatar']
        
        if 'images' in request.FILES:
            data['images'] = request.FILES.getlist('images')

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def get_queryset(self):
        queryset = Case.objects.all()
        
        # Filter by status
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)

        # Filter by tags
        tags = self.request.query_params.getlist('tags', None)
        if tags:
            queryset = queryset.filter(tags__name__in=tags).distinct()

        # Filter by services
        services = self.request.query_params.getlist('services', None)
        if services:
            queryset = queryset.filter(services__name__in=services).distinct()

        # Filter by stacks
        stacks = self.request.query_params.getlist('stacks', None)
        if stacks:
            queryset = queryset.filter(stacks__name__in=stacks).distinct()

        # Search by title or description
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search)
            )

        return queryset.order_by('-created_at')

    @action(detail=False, methods=['get'])
    def published(self, request):
        """Get only published cases"""
        cases = self.get_queryset().filter(status='published')
        serializer = self.get_serializer(cases, many=True)
        return Response(serializer.data)

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [AllowAny]

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]

class StackViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stack.objects.all()
    serializer_class = StackSerializer
    permission_classes = [AllowAny]
