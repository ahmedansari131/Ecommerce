import { sendingProductId } from "./module.js";

console.log("This is product page");
let addToCartBtn = document.querySelector(".product-btn .add-to-cart");

addToCartBtn.addEventListener("click", (e) => {
  let productId = e.target.id;
  let url = "/shop/" + productId;
  console.log("sent " + url);
  sendingProductId(url);
});

