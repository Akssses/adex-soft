from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, TagViewSet, PostViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('tags', TagViewSet)
router.register('posts', PostViewSet)

urlpatterns = router.urls 