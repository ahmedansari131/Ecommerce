import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from .models import Product, Display_Product, CartItem, Address
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.core import serializers


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
    user = request.user
    print(user)
    product = []
    added_product = CartItem.objects.filter(user=user)
    print(added_product)
    added_product_id = added_product.values_list("added_product_id", flat=True)
    print(added_product_id)

    for product_id in added_product_id:
        filtered_product = Product.objects.filter(id=product_id)
        product.extend(filtered_product)

    params = {"products": product}
    return render(request, "shop/cart.html", params)


def cart_url(request, prod_id, rem=None):
    if request.method == "GET" and rem == None:
        user_email = request.user.username
        print(user_email)
        username = get_object_or_404(User, username=user_email)
        product = get_object_or_404(Product, id=prod_id)
        print("this is product id", product)
        product_id = product.id
        print(product_id)
        cart_item = CartItem(added_product_id=product_id, user=username)
        cart_item.save()
        return JsonResponse({"message": "Product added to cart"})

    elif request.method == "GET" and rem:
        product = Product.objects.filter(id=prod_id)
        product_id = product.values_list("id", flat=True).first()
        cart_item = CartItem(added_product_id=product_id)
        cart_item.delete()
        return JsonResponse({"message": "Product removed"})


def handle_signup(request):
    print("In handle signup")
    if request.method == "POST":
        first_name = request.POST.get("first-name")
        last_name = request.POST.get("last-name")
        print(first_name, last_name)
        email = request.POST.get("email")
        password = request.POST.get("password")
        c_password = request.POST.get("c-password")
        if password == c_password:
            user = User.objects.create_user(email, email, password)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            return redirect("/shop")
        else:
            return HttpResponse("Password does match")
    else:
        print("error")
        return HttpResponse("Error")


def handle_login(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = authenticate(request, username=email, password=password)
        print("In handle login")
        if user is not None:
            login(request, user)
            print("Success")
            return redirect("/shop")
        else:
            return HttpResponse("User does not exist")
    else:
        return HttpResponse("Error")


def handle_logout(request):
    logout(request)
    return redirect("/shop")


def user_exists(username):
    user = User.objects.filter(username=username).exists()
    return user


def get_address(request):
    print("In address")
    if request.method == "POST":
        name = request.POST.get("name")
        username = request.user.username
        print(username)
        mob = request.POST.get("mobile")
        pin = request.POST.get("pincode")
        locality = request.POST.get("locality")
        address = request.POST.get("address")
        city = request.POST.get("city")
        state = request.POST.get("state")

        # Retrieve the user instance using the username
        user_instance = get_object_or_404(User, username=username)

        # Create the Address object and set the user foreign key
        add_details = Address(
            name=name,
            username=user_instance,
            mobile=mob,
            pincode=pin,
            locality=locality,
            address=address,
            city=city,
            state=state,
        )

        add_details.save()
        request.session["add_submitted"] = True
        return redirect("/shop/checkout")
    else:
        return redirect("/shop/checkout")


def signup(request):
    return render(request, "shop/signup.html")


def login_page(request):
    return render(request, "shop/login.html")


def checkout(request):
    all_address = {}
    cart_prod_dict = {}
    add_value_list = []

    is_username = request.user
    if user_exists(is_username):
        add = Address.objects.filter(username=is_username)
        add_value_list = add.values_list("name", "address", "mobile", "pincode")

        for i, address in enumerate(add_value_list):
           all_address[i] = address
           i += 1
        request.session["addresses"] = all_address

        cart = CartItem.objects.filter(user=request.user)
        cart_prod_id = cart.values_list("added_product_id", flat=True)
        for values in cart_prod_id:
            card_data = Product.objects.get(id=values)
            cart_prod_dict[values] = [
                card_data.product_name,
                card_data.og_price,
                card_data.discounted_price,
                card_data.product_image,
            ]
        print(cart_prod_dict)
        params = {
            "add_data": add_value_list,
            "all_address": all_address,
            "cart_prod_data": cart_prod_dict
        }

    return render(request, "shop/checkout.html", params)


def fetch_cart_on_checkout(request):
    # Getting the products prices to display on the checkout page
    cart = CartItem.objects.filter(user=request.user)
    cart_prod_id = cart.values_list("added_product_id", flat=True)
    cart_prod_dict = {}
    for values in cart_prod_id:
        card_data = Product.objects.get(id=values)
        cart_prod_dict[values] = [
            card_data.product_name,
            card_data.og_price,
            card_data.discounted_price,
        ]
    return JsonResponse({"cart_prod_data": cart_prod_dict})


def get_address_details(request):
    # single_add = request.session.get("single_add", {})
    all_address = request.session.get("addresses", {})
    # remaining_add = request.session.get("remaining_add", {})
    return JsonResponse({"all_address": all_address})


def get_address_status(request):
    add_submitted = request.session.get("add_submitted", False)
    return JsonResponse({"add_submitted": add_submitted})


def contact_us(request):
    return HttpResponse("We are at contact")


def tracking_status(request):
    return HttpResponse("We are at tracking")


def search(request):
    return HttpResponse("We are at search")
