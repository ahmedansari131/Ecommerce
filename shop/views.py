from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def index(request):
    return render(request, 'shop/index.html')


def about_us(request):
    return HttpResponse('We are at about')


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

