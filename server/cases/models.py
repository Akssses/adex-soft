from django.db import models
from django.utils.text import slugify
import os

def case_image_path(instance, filename):
    """Generate file path for case images"""
    ext = filename.split('.')[-1]
    filename = f"{slugify(instance.case.title)}_{instance.id}.{ext}"
    return os.path.join('cases/images', filename)

def client_avatar_path(instance, filename):
    """Generate file path for client avatars"""
    ext = filename.split('.')[-1]
    filename = f"client_{slugify(instance.client_name)}_{instance.id}.{ext}"
    return os.path.join('cases/avatars', filename)

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Service(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Stack(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Case(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    project_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('draft', 'Draft'),
            ('published', 'Published'),
            ('archived', 'Archived')
        ],
        default='draft'
    )
    
    # Review fields
    review_text = models.TextField(blank=True)
    client_name = models.CharField(max_length=100, blank=True)
    client_position = models.CharField(max_length=100, blank=True)
    client_avatar = models.ImageField(upload_to=client_avatar_path, blank=True)

    # Many-to-Many relationships
    tags = models.ManyToManyField(Tag, related_name='cases', blank=True)
    services = models.ManyToManyField(Service, related_name='cases', blank=True)
    stacks = models.ManyToManyField(Stack, related_name='cases', blank=True)

    def __str__(self):
        return self.title

class CaseImage(models.Model):
    case = models.ForeignKey(Case, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to=case_image_path)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

class ProcessStage(models.Model):
    case = models.ForeignKey(Case, related_name='stages', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    duration = models.CharField(max_length=100)
    description = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
