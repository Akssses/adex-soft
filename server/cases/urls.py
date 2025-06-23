from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.CaseViewSet, basename='case')
router.register(r'tags', views.TagViewSet)
router.register(r'services', views.ServiceViewSet)
router.register(r'stacks', views.StackViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 