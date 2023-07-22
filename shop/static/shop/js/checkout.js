// console.log("Hello checkout");
var singleAddStatus = null;
var remainAddStatus;
let url = "/shop/getaddressstatus/";
fetch(url, {
  method: "GET",
  headers: {
    "Content-type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    var singleAddStatus = data.single_add;
    var remainAddStatus = data.add_data;
    console.log(singleAddStatus);
    showAddressContainer(singleAddStatus, remainAddStatus);
  })
  .catch((error) => {
    console.log(error);
  });

function isObjectEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function showAddressContainer(singleAddStatus, remainAddStatus) {
  let addressCurrentContainer = document.querySelector(".current-container");
  let addressForm = document.querySelector(".delivery-add");
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
    <button class="deliver-here">Deliver Here</button>
</div>`;
  } else {
    addressCurrentContainer.style.display = "none";
    addressForm.innerHTML = `
<div class="body">
    <div class="address-form">
        <form action="/shop/getaddress/" method="post">

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
                <button class="save" id="save">Save and deliver here</button>
                <button class="cancel" id="cancel">Cancel</button>
            </div>

        </form>
    </div>
    <!-- Order Summary -->
</div>`;
  }
}
