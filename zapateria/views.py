from django.shortcuts import render

# Create your views here.
def logear(request):
    context={}
    return render(request, "../../../autenticacion/templates/login/login.html", context)


def productos(request):
    context={}
    return render(request, "../../../productos/templates/Productos/Productos.html", context)


def index(request):
    context={}
    return render(request, "zapateria/index.html", context)
def nosotros(request):
    context={}
    return render(request, "zapateria/nosotros.html", context)
def apinoti(request):
    context={}
    return render(request, "zapateria/apinoti.html", context)
def contacto(request):
    context={}
    return render(request, "zapateria/contacto.html", context)

