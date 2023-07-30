var singleAddStatus = null;
var remainAddStatus;
let getAddress = "/shop/getaddressdet/";
let addressSubmittedStatus = "/shop/getaddressstatus";
let cartData = "/shop/getcartdata";


function isObjectEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}


function fetchData(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}

fetchData(getAddress).then((data) => {
  var singleAddStatus = data.single_add;
  var remainAddStatus = data.remaining_add;
  showAddressContainer(singleAddStatus, remainAddStatus);
});

fetchData(addressSubmittedStatus).then((data) => {
  let addressForm = document.querySelector(".delivery-add");
  if (data.add_submitted) {
    addressForm.style.display = "none";
  } else {
    addressForm.style.display = "flex";
  }
});


function showAddressForm(param) {
  let addressForm = document.querySelector(".delivery-add");
  const csrfToken = document.querySelector(
    'input[name="csrfmiddlewaretoken"]'
  ).value;

  param.innerHTML = `
<div class="body">
    <div class="address-form">
        <form action="/shop/getaddress/" method="post">
        <input type="hidden" name="csrfmiddlewaretoken" value="${csrfToken}">
            <div class="input-section">
                <div class="input">
                    <input type="text" name="name" id="name">
                    <label for="name">Name</label>
                </div>
                <div class="input">
                    <input type="tel" name="mobile" id="mob">
                    <label for="mobile">Mobile number</label>
                </div>
            </div>

            <div class="input-section">
                <div class="input">
                    <input type="number" name="pincode" id="pincode" inputmode="numeric">
                    <label for="pincode">Pincode</label>
                </div>
                <div class="input">
                    <input type="text" name="locality" id="locality">
                    <label for="locality">Locality</label>
                </div>
            </div>

            <div class="input-section">
                <div class="input">
                    <textarea name="address" id="address" cols="30" rows="10"></textarea>
                    <label for="address">Address (Area and Street)</label>
                </div>
            </div>

            <div class="input-section">
                <div class="input">
                    <input type="text" name="city" id="city">
                    <label for="city">City/District/Town</label>
                </div>
                <div class="input">
                    <select name="state" id="state">
                        <option value disabled>--Select State--</option>
                        <option value="Maharashtra ">Maharashtra</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Delhi">Delhi</option>
                    </select>
                    <label for="state">State</label>
                </div>
            </div>

            <div class="save-btn">
                <button type="submit" class="save" id="save">Save and deliver here</button>
                <button type="button" class="cancel" id="cancel" onclick="cancelForm()">Cancel</button>
            </div>
        </form>
    </div>
    <!-- Order Summary -->
</div>`;
}


function cancelForm() {
  let addressFormContainer = document.querySelector(".new-address").firstElementChild;
  let newAddressBtnContainer = document.querySelector(".new-address");
  addressFormContainer.style.display = "none";
  newAddressBtnContainer.innerHTML = `<div class="new-add-btn" onclick="replaceAddressForm()">
  <i class="fa-solid fa-plus"></i>
  <p>Add a new address</p>
</div>`;
}


function replaceAddressForm() {
  let newAddressBtn = document.querySelector(".new-add-btn");
  let newAddressContainer = document.querySelector(".new-address");
  newAddressBtn.style.display = "none";
  showAddressForm(newAddressContainer);
}


function showAddressContainer(singleAddStatus, remainAddStatus) {
  let addressCurrentContainer = document.querySelector(".current-container");
  let addressRemainingContainer = document.querySelector(
    ".remaining-container"
  );
  let addressForm = document.querySelector(".delivery-add");
  const csrfToken = document.querySelector(
    'input[name="csrfmiddlewaretoken"]'
  ).value;

  if (!isObjectEmpty(remainAddStatus)) {
    for (let key in remainAddStatus) {
      addressRemainingContainer.innerHTML += `
      <div class="body add-flex">
      <input type="radio" name="select-address" id="select-address">
      <div class="personal-info-container">
        <div>
          <p class="name">${remainAddStatus[key][0]}</p>
          <p class="mobile">${remainAddStatus[key][2]}</p>
        </div>
        <div class="address-container">
          <p class="address">${remainAddStatus[key][1]} - <b>${remainAddStatus[key][3]}</b></p>
        </div>
      </div>
      </div>
    `;
    }
    if (!isObjectEmpty(singleAddStatus)) {
      addressCurrentContainer.innerHTML = `
    <input type="radio" name="select-address" id="select-address" checked>
    <div class="personal-info-container">
    <div>
        <p class="name">${singleAddStatus.address[0]}</p>
        <p class="mobile">${singleAddStatus.address[2]}</p>
    </div>

    <div class="address-container">
        <p class="address">${singleAddStatus.address[1]} - <b>${singleAddStatus.address[3]}</b></p>
    </div>
    <button class="deliver-here" id="deliver-btn" onclick="deliverAddressFunc()">Deliver Here</button>
</div>`;
    }
  } else if (!isObjectEmpty(singleAddStatus)) {
    addressCurrentContainer.innerHTML = `
    <input type="radio" name="select-address" id="select-address" checked>
    <div class="personal-info-container">
    <div>
        <p class="name">${singleAddStatus.address[0]}</p>
        <p class="mobile">${singleAddStatus.address[2]}</p>
    </div>

    <div class="address-container">
        <p class="address">${singleAddStatus.address[1]} - <b>${singleAddStatus.address[3]}</b></p>
    </div>
    <button class="deliver-here" id="deliver-btn" onclick="deliverAddressFunc()">Deliver Here</button>
</div>`;
  } else {
    addressCurrentContainer.style.display = "none";
    showAddressForm(addressForm);
  }
}


// Fetching cart data from database for Checkout Page
var cart = JSON.parse(localStorage.getItem("Quantity"));
function displayPrice() {
  fetchData(cartData).then((data) => {
    let cartDataObj = data["cart_prod_data"];
    let ogPriceLabel = document.getElementById("og-price");
    let discountedPriceLabel = document.getElementById("discount-price");
    let itemQuantityLabel = document.getElementById("item-count");
    let totalPriceLabel = document.getElementById("total-amount");
    let ogPrice = 0;
    let discountedPriceSum = 0;
    let itemCounter = 0;

    for (value in cartDataObj) {
      let itemQuantity = cart["product " + value];
      ogPrice += itemQuantity * cartDataObj[value][1];
      discountedPriceSum += cartDataObj[value][2] * itemQuantity;
      itemCounter += 1;
    }

    ogPriceLabel.innerHTML = `&#8377;${ogPrice}`;
    itemQuantityLabel.innerHTML = `Price (${itemCounter} items)`;
    discountedPriceLabel.innerHTML = `- &#8377;${ogPrice - discountedPriceSum}`;
    totalPriceLabel.innerHTML = `&#8377;${ogPrice - (ogPrice - discountedPriceSum)}`;
  });
}


function showQuantityInSummary() {
  let itemQuantity = JSON.parse(localStorage.getItem("Quantity"));
  for (value in itemQuantity) {
    let quantity = document.getElementById(`item-${value.split(" ")[1]}`);
    quantity.innerHTML = `${itemQuantity[`product ${value.split(" ")[1]}`]} items`;
  }
}
showQuantityInSummary();


// Deliver button logic
function deliverAddressFunc() {
  let confirmedAddressContainer = document.getElementById("deliver-btn").parentElement;
  const custName = confirmedAddressContainer.querySelector(".name").innerHTML;
  const custPhone = confirmedAddressContainer.querySelector(".mobile").innerHTML;
  const custAddress = confirmedAddressContainer.querySelector(".address").innerHTML.split("-")[0];
  const custCode = confirmedAddressContainer.querySelector("b").innerHTML;

  localStorage.setItem("addressConfirmed", true);
  addressConfirmed();
}


function orderContinueFunc() {
  let rawOrderSummary = document.getElementById("raw-order-summary");
  let continueBtn = document.getElementById("continue");
  let prod_items = rawOrderSummary.querySelector("p");
  const products = Object.keys(cart).length;
  prod_items.innerHTML = `${products} items`;
  continueBtn.addEventListener('click', (e) => {
    localStorage.setItem("orderConfirmed", true);
    orderConfirmed();
  });
}
orderContinueFunc();


// By default the confirmed data display will be none
let confirmedData = document.querySelectorAll(".confirmed");
let rawAddressContainer = document.getElementById("address-confirmed");
rawAddressContainer.style.display = "none";
confirmedData.forEach((item) => {
  item.style.display = "none";
});

window.addEventListener("DOMContentLoaded", (e) => {
  displayPrice();
  if (JSON.parse(localStorage.getItem("addressConfirmed")) || JSON.parse(localStorage.getItem("orderConfirmed"))) {
    addressConfirmed();
    orderConfirmed();
  }
});


function addressConfirmed() {
  let currentAddressHeader = document.querySelector(".current-address-header");
  let currentAddressContainer = document.querySelector(".current-container");
  let remainingAddressContainer = document.querySelector(".remaining-container");
  let newAddressBtn = document.querySelector(".new-address");
  let rawOrderSummary = document.getElementById("raw-order-summary");
  let orderSummary = document.getElementById("order-content");
  let rawAddressContainer = document.getElementById("address-confirmed");
  let confirmedData = document.querySelectorAll(".confirmed");

  rawAddressContainer.style.display = "block";
  currentAddressContainer.style.display = "none";
  newAddressBtn.style.display = "none";
  currentAddressHeader.style.display = "none";
  rawOrderSummary.style.display = "none";
  orderSummary.style.display = "block";
  try {
    remainingAddressContainer.style.display = "none";
  } catch (error) { }

  if (JSON.parse(localStorage.getItem("addressConfirmed"))) {
    confirmedData.forEach((item) => {
      item.style.display = "block";
    });
  }
}


function orderConfirmed() {
  let orderContent = document.querySelector(".order-content");
  let rawOrderSummary = document.getElementById("raw-order-summary");
  let confirmedData = document.querySelectorAll(".confirmed");

  if (JSON.parse(localStorage.getItem("orderConfirmed"))) {
    orderContent.style.display = "none";
    rawOrderSummary.style.display = "flex";
    confirmedData.forEach((item) => {
      item.style.display = "block";
    });
  }
}



