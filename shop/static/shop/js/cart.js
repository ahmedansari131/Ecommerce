// Logic for fixing the price contianer at the top
window.addEventListener("scroll", function () {
  let cartContainer = document.querySelector(".cart-container");
  let priceContainer = document.querySelector(".cart-price-container");
  let scrollTop = cartContainer.scrollTop || document.documentElement.scrollTop;
  if (scrollTop > 0) {
    priceContainer.style.top = scrollTop + "px";
  } else {
    priceContainer.style.top = 0 + "px";
  }
});

// Removing the item by sending the product id to the url
import { sendingProductId } from "./module.js";
let removeBtn = document.querySelectorAll(".remove-item-btn");
function removeCartItem(item) {
  item.addEventListener("click", (e) => {
    let prodId = e.target.id;
    let url = "/shop/" + prodId + "/rem/";
    sendingProductId(url);
    item.parentElement.parentElement.parentElement.remove();
    localStorage.removeItem("product" + prodId);
    removeItem(prodId);
    let keyValue = JSON.parse(localStorage.getItem("Quantity"));
    if (Object.keys(keyValue).length === 0){
      localStorage.removeItem("Quantity");
    }
  });
}
removeBtn.forEach(function (item) {
  removeCartItem(item);
});

// ADDING THE LOGIC INTO ITEM QUANTITY COUNTER
let addBtn = document.querySelectorAll(".operation-add");
let subBtn = document.querySelectorAll(".operation-subtract");
let displayQuantity = document.querySelectorAll(".quantity");
let allProductCards = document.querySelectorAll(".cart-product-det");

if (localStorage.getItem("Quantity") == null) {
  var cart = {};
  displayQuantity.forEach((item) => {
    item.innerHTML = 1;
  });
  fetchProductsInStorage();
} else {
  console.log(cart);
  cart = getCart();
}

function fetchProductsInStorage() {
  console.log("in the fucntion");
  allProductCards.forEach((item) => {
    if (item) {
      let prodId = item.id;
      cart[prodId] = 1;
      let cartObjToStr = JSON.stringify(cart);
      localStorage.setItem("Quantity", cartObjToStr);
      console.log("Chal rha h");
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
