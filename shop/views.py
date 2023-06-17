from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Product, Display_Product


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
    # print("This is item",item)
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
    # print("This is item",item)
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
    # print("This is item",item)
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
    # print("This is item",item)
    return render(request, "shop/category_pages/base_cat.html", params)


def sub_category_wise_product(request):
    sub_item_dict = {}

    css_file_path = "shop/css/category.css"
    sub_category = request.GET.get("sub_category")
    matching_products = Product.objects.filter(sub_category=sub_category)

    sub_items = matching_products.values_list("item", "sub_item").distinct()
    print("This is unique subitem", sub_items)

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

    params = {
        "products": matching_products,
        "css_file_path": css_file_path,
        "sub_item_dict": sub_item_dict,
        "subcategory": sub_category,
    }
    return render(request, "shop/single_product_page/products.html", params)


def sub_item_wise_product(request):
    sub_item_dict = {}

    sub_item = request.GET.get("sub_item")
    sub_item_name = Product.objects.filter(sub_item=sub_item)
    # print("This is subitem name", sub_item_name)

    sub_category = request.GET.get("sub_category")
    all_sub_category = Product.objects.filter(sub_category=sub_category)
    all_item = all_sub_category.values_list("item", "sub_item")
    # print("This is all item", all_item)

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
    # print(sub_item_dict)
    # print(sub_item_name)

    params = {
        "products": sub_item_name,
        "sub_item_dict": sub_item_dict,
        "subcategory": sub_category,
        "subitem": sub_item
    }
    return render(request, "shop/category_pages/sub_item.html", params)


def contact_us(request):
    return HttpResponse("We are at contact")


def tracking_status(request):
    return HttpResponse("We are at tracking")


def search(request):
    return HttpResponse("We are at search")


def checkout(request):
    return HttpResponse("We are at checkout")
