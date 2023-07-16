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
window.addEventListener('scroll', function(){
  let navbar = document.querySelector('.nav')
    navbar.style.top = 0 + 'px'
});

