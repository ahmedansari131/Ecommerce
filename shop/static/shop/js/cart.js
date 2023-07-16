// ADDING THE LOGIC INTO ITEM QUANTITY COUNTER
let addBtn = document.querySelectorAll(".operation-add");
let subBtn = document.querySelectorAll(".operation-subtract");
let displayQuantity = document.querySelectorAll(".quantity");
let allProductCards = document.querySelectorAll(".cart-product-det");
let isRemovedBtn = false;

if (localStorage.getItem("Quantity") == null) {
  var cart = {};
  displayQuantity.forEach((item) => {
    item.innerHTML = 1;
  });
  fetchProductsInStorage(); // When cart is empty and then the product is added
} else {
  cart = getCart();
  allProductCards.forEach((item) => {
    let prodId = item.id;
    if (!cart.hasOwnProperty(prodId)) {
      cart[prodId] = 1;
      updateCart(cart);
    }
  });
}

// Removing the item by sending the product id to the url
import { sendingProductId } from "./module.js";
let removeBtn = document.querySelectorAll(".remove-item-btn");
function removeCartItem(item) {
  item.addEventListener("click", (e) => {
    let prodId = e.target.id;
    let url = "/shop/" + prodId + "/rem/";
    sendingProductId(url);
    isRemovedBtn = true;
    if (isRemovedBtn) {
      fetchPrice(cart);
    }
    item.parentElement.parentElement.parentElement.remove();
    localStorage.removeItem("product" + prodId);
    removeItem(prodId);
    let keyValue = JSON.parse(localStorage.getItem("Quantity"));
    if (Object.keys(keyValue).length === 0) {
      localStorage.removeItem("Quantity");
    }
  });
}
removeBtn.forEach(function (item) {
  removeCartItem(item);
});

function fetchProductsInStorage() {
  allProductCards.forEach((item) => {
    let prodId = item.id;
    if (item) {
      cart[prodId] = 1;
      updateCart(cart);
    }
  });
}

addBtn.forEach((item) => {
  item.addEventListener("click", () => {
    let prodId = item.id.slice(4);
    addItem(cart, prodId);
  });
});

subBtn.forEach((item) => {
  item.addEventListener("click", () => {
    let prodId = item.id.slice(4);
    subtractItem(cart, prodId);
  });
});

function addItem(cart, product) {
  if (cart.hasOwnProperty("product " + product)) {
    cart["product " + product] = cart["product " + product] + 1;
  } else {
    cart["product " + product] = 2;
  }
  updateCart(cart);
  fetchPrice(cart);
}

function subtractItem(cart, product) {
  if (cart.hasOwnProperty("product " + product)) {
    if (cart["product " + product] === 1) return;
    else {
      cart["product " + product] = cart["product " + product] - 1;
    }
  } else {
    console.log("There is no product");
  }
  updateCart(cart);
  fetchPrice(cart);
}

function updateCart(cart) {
  let cartObjToStr = JSON.stringify(cart);
  localStorage.setItem("Quantity", cartObjToStr);
  getCart();
}

function getCart() {
  let fetchCartData;
  displayQuantity.forEach((item) => {
    let fetchDisplayId = item.id.slice(8);
    fetchCartData = JSON.parse(localStorage.getItem("Quantity"));
    if ("product " + fetchDisplayId in fetchCartData) {
      item.innerHTML = fetchCartData["product " + fetchDisplayId];
    } else {
      item.innerHTML = 1;
    }
  });
  return fetchCartData;
}

function removeItem(product) {
  let cartData = JSON.parse(localStorage.getItem("Quantity"));
  delete cartData["product " + product];
  updateCart(cartData);
}

// REALTIME PRICE FETCH AND SHOWING ON THE CARD
function fetchPrice(cart) {
  let ogPriceSum = 0;
  let discountValue = 0;
  let discountPriceSum = 0;
  let totalPrice = 0;
  let itemCount = 0;
  let showOgPrice = document.getElementById("og-price");
  let showDiscountPrice = document.getElementById("discount-price");
  let showTotalAmount = document.getElementById("total-amount");
  let showItemCount = document.getElementById("item-count");
  let keysOfCart = Object.keys(cart);
  itemCount = keysOfCart.length;

  for (let key in cart) {
    if (cart.hasOwnProperty(key)) {
      let value = cart[key];
      let ogPrice;
      let discountPrice;
      let prodId = key.slice(8);
      let ogPriceElement = document.getElementById(`og-${prodId}`);
      let discountPriceElement = document.getElementById(`discount-${prodId}`);
      ogPrice = parseInt(ogPriceElement.innerHTML);
      discountPrice = parseInt(discountPriceElement.innerHTML);
      ogPriceSum += ogPrice * value;
      discountPriceSum += discountPrice * value;
      discountValue = ogPriceSum - discountPriceSum;
      totalPrice = ogPriceSum - discountValue;
    }
  }
  showOgPrice.innerHTML = ogPriceSum;
  showDiscountPrice.innerHTML = "-" + discountValue;
  showTotalAmount.innerHTML = totalPrice;
  showItemCount.innerHTML = `Price (${itemCount} item)`;

  console.log("Success");
}
fetchPrice(cart);


