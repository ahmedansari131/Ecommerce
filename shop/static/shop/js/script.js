// Product Category Dropdown
document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }

  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown == currentDropdown) return;
    dropdown.classList.remove("active");
  });
});

// Fixing the position of the navbar
window.addEventListener('scroll', function () {
  let navbar = document.querySelector('.nav')
  navbar.style.top = 0 + 'px'
});


let dropdown = document.querySelector(".login-btn")
let dropdownList = document.querySelector(".dropdown-list");
dropdown.addEventListener("mouseover", (e) => {
  // console.log("Hover");
  dropdownList.classList.add("dropdown-hover");
});

dropdownList.addEventListener("mouseover", (e) => {
  // console.log("Hover");
  dropdownList.classList.add("dropdown-hover");
});

dropdownList.addEventListener("mouseout", (e) => {
  // console.log("Hover");
  dropdownList.classList.remove("dropdown-hover");
});
try {
  let logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", (e) => {
    localStorage.clear();
  });
} catch (error) {
  
}

