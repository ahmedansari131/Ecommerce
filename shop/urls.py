from . import views
from django.urls import path


urlpatterns = [
    path("", views.index, name="shopHome"),
    path("about/", views.about_us, name="AboutUs"),
    path("contact/", views.contact_us, name="ContactUs"),
    path("tracker/", views.tracking_status, name="TrackingStatus"),
    path("product/", views.product, name="Product"),
    path("search/", views.search, name="Search"),
    path("checkout/", views.checkout, name="Checkout"),
]