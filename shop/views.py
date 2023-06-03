from django.shortcuts import render
from django.http import HttpResponse
from .models import Product


# Create your views here.
def index(request):
    products = Product.objects.all()
    print(products)
    params = {'products': products, 'range': range(1, len(products))}
    return render(request, 'shop/index.html', params)



def contact_us(request):
    return HttpResponse('We are at contact')

def tracking_status(request):
    return HttpResponse('We are at tracking')

def search(request):
    return HttpResponse('We are at search')

def checkout(request):
    return HttpResponse('We are at checkout')

def electronic(request):
    return HttpResponse('We are at electronic')

def fashion(request):
    return HttpResponse('We are at fashion')

def grocery(request):
    return HttpResponse('We are at grocery')

def mobile(request):
    return HttpResponse('We are at mobile')

