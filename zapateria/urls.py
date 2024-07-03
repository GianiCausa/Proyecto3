from django.urls import path
from . import views

urlpatterns = [
    #path('', views.login, name="login"),
    path('index', views.index, name="index"),
    path('nosotros', views.nosotros, name="nosotros"),
    path('apinoti', views.apinoti, name="apinoti"),
    path('contacto', views.contacto, name="contacto"),
    path('logear' , views.logear , name="logear"),
    path('productos', views.productos, name="productos"),
]