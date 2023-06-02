from django.shortcuts import render
from django.http import HttpResponse
from .models import Product


# Create your views here.
def index(request):
    products = Product.objects.all()
    print(products)
    params = {'products': products, 'range': range(1, len(products))}
    return render(request, 'shop/index.html', params)


def about_us(request):
    return render(request, 'shop/about.html')


def contact_us(request):
    return HttpResponse('We are at contact')


def tracking_status(request):
    return HttpResponse('We are at tracking')


def product(request):
    return HttpResponse('We are at product')


def search(request):
    return HttpResponse('We are at search')


def checkout(request):
    return HttpResponse('We are at checkout')

