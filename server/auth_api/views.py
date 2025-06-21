from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer, ChangePasswordSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ChangePasswordView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            # Проверяем старый пароль
            if not user.check_password(serializer.data.get("old_password")):
                return Response(
                    {"old_password": "Неверный пароль"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Устанавливаем новый пароль
            user.set_password(serializer.data.get("new_password"))
            user.save()
            return Response(
                {"message": "Пароль успешно изменен"},
                status=status.HTTP_200_OK
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
