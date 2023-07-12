// console.log("This is Cart");

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
  });
}

removeBtn.forEach(function (item) {
  removeCartItem(item);
});

// Logic for the items counter
let subtractItem = document.querySelectorAll(".operation-subtract");
let addItem = document.querySelectorAll(".operation-add ");

addItem.forEach(function (item) {
  let counter = localStorage.getItem("product" + item.id) || 1;
  item.previousElementSibling.innerHTML = counter;
  item.addEventListener("click", (e) => {
    let prodId = e.target.id;
    counter = parseInt(localStorage.getItem("product" + prodId)) || 1;
    counter += 1;
    localStorage.setItem("product" + prodId, counter);
    let cart = localStorage.getItem("product" + prodId);
    item.previousElementSibling.innerHTML = cart;
  });
});

subtractItem.forEach(function (item) {
  item.addEventListener("click", (e) => {
    let prodId = e.target.id;
    let counter = parseInt(localStorage.getItem("product" + prodId)) || 1;
    if (counter == 0) return;
    else {
      counter -= 1;
    }
    localStorage.setItem("product" + prodId, counter);
    let cart = localStorage.getItem("product" + prodId);
    if (parseInt(cart) == 0) {
      localStorage.removeItem("product" + prodId);
      // item.parentElement.parentElement.parentElement.remove();
    }
    item.nextElementSibling.innerHTML = cart;
  });
});

// CALCULATING THE PRICE BASED ON THE ITEMS IN THE CART IN REAL TIME
let discountedPrice = document.querySelectorAll(".discounted-price");
let ogPrice = document.querySelectorAll(".og-price");
let totalPrice = document.querySelector(".price");
let totalAmount = document.querySelector(".total-amount");
let discountPrice = document.querySelector(".discount-price");
let productPriceContainer = document.querySelectorAll(".product-price")
let singleOgPrice = 0;
let singleDiscountedPrice = 0;

ogPrice.forEach(function (item) {
  singleOgPrice += parseInt(item.innerHTML);
});
console.log("Og Price " + singleOgPrice);

discountedPrice.forEach(function (item) {
  singleDiscountedPrice += parseInt(item.innerHTML);
});
console.log("Discounted Price " + singleDiscountedPrice);

addItem.forEach(function(item){
  item.addEventListener('click', (e) => {
    let extractItemCounter = item.previousElementSibling.innerHTML;
    // priceOfCounter = extractItemCounter * item.pa
    console.log("This is extracted "+ extractItemCounter);
  })
})





totalPrice.innerHTML = " &#8377;" + singleOgPrice;
discountPrice.innerHTML = `<i class="fa-solid fa-minus"></i>  &#8377;${singleOgPrice - singleDiscountedPrice}`;
totalAmount.innerHTML = " &#8377;" + singleDiscountedPrice;
