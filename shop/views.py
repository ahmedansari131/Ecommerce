import html
from urllib.parse import quote, unquote
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Product, Display_Product, CartItem


# Create your views here.
def index(request):
    css_file_path = "shop/style.css"
    products = Product.objects.all()
    params = {
        "products": products,
        "range": range(1, len(products)),
        "css_file_path": css_file_path,
    }
    return render(request, "shop/index.html", params)


def electronic(request):
    css_file_path = "shop/css/category.css"
    products = Display_Product.objects.all()
    for category in products:
        item = Display_Product.objects.filter(category="Electronic")
    params = {
        "products": item,
        "range": range(1, len(products)),
        "category_heading": "Electronic",
        "css_file_path": css_file_path,
    }
    return render(request, "shop/category_pages/base_cat.html", params)


def mobile(request):
    css_file_path = "shop/css/category.css"
    products = Display_Product.objects.all()
    for category in products:
        item = Display_Product.objects.filter(category="Mobile")
    params = {
        "products": item,
        "range": range(1, len(products)),
        "category_heading": "Mobile",
        "css_file_path": css_file_path,
    }
    return render(request, "shop/category_pages/base_cat.html", params)


def fashion(request):
    css_file_path = "shop/css/category.css"
    products = Display_Product.objects.all()
    for category in products:
        item = Display_Product.objects.filter(category="Fashion")
    params = {
        "products": item,
        "range": range(1, len(products)),
        "category_heading": "Fashion",
        "css_file_path": css_file_path,
    }
    return render(request, "shop/category_pages/base_cat.html", params)


def grocery(request):
    css_file_path = "shop/css/category.css"
    products = Display_Product.objects.all()
    for category in products:
        item = Display_Product.objects.filter(category="Grocery")
    params = {
        "products": item,
        "range": range(1, len(products)),
        "category_heading": "Grocery",
        "css_file_path": css_file_path,
    }
    return render(request, "shop/category_pages/base_cat.html", params)


def sub_category_wise_product(request):
    sub_item_dict = {}

    css_file_path = "shop/css/category.css"
    sub_category = request.GET.get("sub_category")
    matching_products = Product.objects.filter(sub_category=sub_category)
    print("Matching List", matching_products)

    sub_items = matching_products.values_list("item", "sub_item").distinct()

    for dropdown_item, dropdown_sub_item1 in sub_items:
        if dropdown_item in sub_item_dict:
            sub_item_dict[dropdown_item] = [dropdown_sub_item1, dropdown_sub_item2]
        else:
            sub_item_dict[dropdown_item] = dropdown_sub_item1
            dropdown_sub_item2 = dropdown_sub_item1

    for key, value in sub_item_dict.items():
        if isinstance(value, list):
            sub_item_dict[key] = value
        elif isinstance(value, str):
            value = list(value)
            value = ["".join(value)]
            sub_item_dict[key] = value

    print("This is products", matching_products)
    print("This is subitem", sub_item_dict)
    print(len(sub_item_dict))

    params = {
        "products": matching_products,
        "css_file_path": css_file_path,
        "sub_item_dict": sub_item_dict,
        "subcategory": sub_category,
    }
    return render(request, "shop/category_pages/sub_cat.html", params)


def sub_item_wise_product(request):
    sub_item_dict = {}

    sub_item = request.GET.get("sub_item")
    sub_item_name = Product.objects.filter(sub_item=sub_item)

    sub_category = request.GET.get("sub_category")
    all_sub_category = Product.objects.filter(sub_category=sub_category)
    all_item = all_sub_category.values_list("item", "sub_item")

    for dropdown_item, dropdown_sub_item1 in all_item:
        if dropdown_item in sub_item_dict:
            sub_item_dict[dropdown_item] = [dropdown_sub_item1, dropdown_sub_item2]
        else:
            sub_item_dict[dropdown_item] = dropdown_sub_item1
            dropdown_sub_item2 = dropdown_sub_item1

    for key, value in sub_item_dict.items():
        if isinstance(value, list):
            sub_item_dict[key] = value
        elif isinstance(value, str):
            value = list(value)
            value = ["".join(value)]
            sub_item_dict[key] = value

    params = {
        "products": sub_item_name,
        "sub_item_dict": sub_item_dict,
        "subcategory": sub_category,
        "subitem": sub_item,
    }
    return render(request, "shop/category_pages/sub_item.html", params)


def single_product(request):
    product_dict = {}
    raw_product_id = request.GET.get("product_id")
    product_id = raw_product_id.strip("'")

    product_object = Product.objects.filter(id=product_id)

    product_queryset = product_object.values()
    product = list(product_queryset)

    for dictionary in product:
        product_dict.update(dictionary)
        product_dict["discount_percent"] = int(
            (
                (product_dict["og_price"] - product_dict["discounted_price"])
                / product_dict["og_price"]
            )
            * 100
        )

        if product_dict["highlights"]:
            item = product_dict["highlights"].replace("|", ",")
            item = item.split(" , ")
            product_dict["highlights"] = item
    params = {"product_dict": product_dict}
    return render(request, "shop/single_product_page/single_product.html", params)


def cart(request):
    product = []
    total_price = 0
    added_product = CartItem.objects.all()
    added_product_id = added_product.values_list('added_product_id', flat=True)

    for product_id in added_product_id:
        filtered_product = Product.objects.filter(id = product_id)
        product_price = filtered_product.values_list('discounted_price', flat=True)
        product.extend(filtered_product)

    params = {'products': product}
    return render(request, "shop/cart.html", params)


def cart_url(request, prod_id, rem = None):

    if request.method == "GET" and rem == None:
        product = Product.objects.filter(id = prod_id)
        product_id = product.values_list('id', flat=True).first()
        cart_item = CartItem(added_product_id = product_id  )
        cart_item.save()
        return JsonResponse({'message': "Product added to cart"})

    elif request.method == "GET" and rem:
        product = Product.objects.filter(id = prod_id)
        product_id = product.values_list('id', flat=True).first()
        cart_item = CartItem(added_product_id = product_id  )
        cart_item.delete()
        return JsonResponse({'message': "Product removed"})



def checkout(request):

    return render(request, "shop/checkout.html")














def registration(request):
    return render(request, "shop/registration.html")















def contact_us(request):
    return HttpResponse("We are at contact")


def tracking_status(request):
    return HttpResponse("We are at tracking")


def search(request):
    return HttpResponse("We are at search")

