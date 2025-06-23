from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
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
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return CaseCreateSerializer
        return CaseSerializer

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
    def published(self):
        """Get only published cases"""
        cases = self.get_queryset().filter(status='published')
        serializer = self.get_serializer(cases, many=True)
        return Response(serializer.data)

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class StackViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Stack.objects.all()
    serializer_class = StackSerializer
