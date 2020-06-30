from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='polls-home'),
    path('create/', views.create, name='polls-create'),
    path('vote/<question_id>/', views.vote, name='polls-vote'),
    path('results/<question_id>/', views.results, name='polls-results'),
]
