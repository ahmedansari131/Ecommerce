var singleAddStatus = null;
var remainAddStatus;
let getAddress = "/shop/getaddressdet/";
let addressSubmittedStatus = "/shop/getaddressstatus";
let cartData = "/shop/getcartdata";
// var activeContainerBody = document.querySelector(".active-container-body")


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
  var allAddress = data.all_address;
  showAddressContainer(allAddress);
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


function showAddressContainer(allAddress) {
  let addressId = 1;
  let activeContainerBody = document.querySelector(".active-container-body");
  const csrfToken = document.querySelector(
    'input[name="csrfmiddlewaretoken"]'
  ).value;
  let isFirstElem = true;

  if (!isObjectEmpty(allAddress) && !JSON.parse(localStorage.getItem("addressConfirmed"))) {
    for (let key in allAddress) {
      let checkedAttribute = isFirstElem ? 'checked' : '';
      activeContainerBody.innerHTML += `
      <div class="address-container" id="add-container-${addressId}">
            <div class="body address-container-body">
                <input type="radio" name="select-address" class="address-radio-input" id="select-address-${addressId}" ${checkedAttribute}>
                <div class="personal-info-container" id="add-info-${addressId}">
                    <div>
                        <p class="name">${allAddress[key][0]}</p>
                        <p class="mobile">${allAddress[key][2]}</p>
                    </div>
                    <div class="address-section">
                        <p class="address">${allAddress[key][1]} - <b>${allAddress[key][3]}</b></p>
                    </div>
                </div>
            </div>
        </div>
    `;

      showDeliveryBtn();
      isFirstElem = false;
      addressId += 1;
    }
  }
  else if (JSON.parse(localStorage.getItem("addressConfirmed"))) {
    addressConfirmed()
  }
  else {
    showAddressForm(activeContainerBody);
  }
}


function showDeliveryBtn() {
  let firstAddressRadioInput = document.getElementById("select-address-1");
  if (firstAddressRadioInput.checked) {
    let deliveryBtnHTML = `<button class="deliver-here" id="deliver-btn" onclick="deliverAddressFunc()">Deliver Here</button>`;
    let container = document.getElementById("add-info-1");
    if (!document.querySelector(".deliver-here")) {
      container.insertAdjacentHTML('beforeend', deliveryBtnHTML);
    }
  }

  let addressRadioInput = document.querySelectorAll(".address-radio-input");
  let itemId;
  addressRadioInput.forEach((item) => {
    item.addEventListener('click', (e) => {
      rmDeliveryBtn()
      let deliveryBtnHTML = `<button class="deliver-here" id="deliver-btn" onclick="deliverAddressFunc()">Deliver Here</button>`;
      itemId = e.target.nextElementSibling.id;
      let addBtnTocontainer = document.getElementById(itemId);
      if (e.target.checked && !item.nextElementSibling.querySelector(".deliver-here")) {
        addBtnTocontainer.insertAdjacentHTML('beforeend', deliveryBtnHTML);
      }
      localStorage.setItem("isDeliveryBtn", true);
    })
  });
}


function rmDeliveryBtn() {
  let addressRadioInput = document.querySelectorAll(".address-radio-input");
  addressRadioInput.forEach((item) => {
    if (!item.checked) {
      try {
        let deliveryBtn = document.querySelector(".deliver-here");
        deliveryBtn.remove();
      } catch (error) {

      }
    }
  })

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
  let addAddressContainer = document.querySelector(".new-address").style.display = "none";
  rawAddressContainer.style.display = "block";
  let activeContainerBody = document.querySelector(".active-container-body");
  let orderContent = document.querySelector(".order-content").innerHTML;
  activeContainerBody.innerHTML = orderContent;
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