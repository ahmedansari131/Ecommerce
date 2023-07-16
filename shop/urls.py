from . import views
from django.urls import path


urlpatterns = [
    path("", views.index, name="shopHome"),
    path("contact/", views.contact_us, name="ContactUs"),
    path("tracker/", views.tracking_status, name="TrackingStatus"),
    path("search/", views.search, name="Search"),
    path("checkout/", views.checkout, name="Checkout"),
    path("electronic/", views.electronic, name="Electronic"),
    path("fashion/", views.fashion, name="Fashion"  ),
    path("grocery/", views.grocery, name="Grocery"),
    path("mobile/", views.mobile, name="Mobile"),
    path("subcategory/", views.sub_category_wise_product, name="Subcategory"),
    path("subitem/", views.sub_item_wise_product, name="SubItem"),
    path("product/", views.single_product, name="Product"),
    path("cart/", views.cart, name="Cart"),
    path("<int:prod_id>/", views.cart_url, name="CartUrl"),
    path("<int:prod_id>/<str:rem>/", views.cart_url, name="CartUrlRem"),
    path("registration/", views.registration, name="Registration"),
    path("checkout/", views.checkout, name="Checkout"),
]