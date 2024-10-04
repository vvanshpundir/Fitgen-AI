from django.urls import path
from . import views
from .views import UploadVideoAPI

urlpatterns = [
    # Define your app's URL patterns here
    path('body-analyzer/', views.body_analyzer, name='body_analyzer'),
    path('upload/', UploadVideoAPI.as_view(), name='upload_video_api'),

]