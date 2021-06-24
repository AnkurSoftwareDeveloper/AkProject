from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from .views import *
from django.urls import path
from django.urls import path, include
from django.contrib.auth import views as auth_views

urlpatterns = [
    # path('register' , RegisterView.as_view()),
    path('userprofile/', UserProfile),
    path('userdetails/<int:pk>/', User_detail),
    path('register/', registration, name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('login/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('adminlogin/', AdminCustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('changepassword/', ChangePasswordView.as_view(), name='change-password'),
    # path('passwordreset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('sendemail/', sending_email, name='sending_email'),

    path('passwordreset/',auth_views.PasswordResetView.as_view(template_name='registration/password_reset.html'),name='password_reset'),
    path('passwordresetdone/',auth_views.PasswordResetDoneView.as_view(template_name='registration/password_reset_sent.html'),name='password_reset_done'),
    path('passwordreset-confirm/<uidb64>/<token>/',auth_views.PasswordResetConfirmView.as_view(template_name='registration/password_reset_form.html'),name='password_reset_confirm'),
    path('passwordreset-complete/', auth_views.PasswordResetCompleteView.as_view(template_name='registration/password_reset_done.html'), name='password_reset_complete'),
]

