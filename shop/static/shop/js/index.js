var mouseDetected = false;
let productItemCard = document.querySelectorAll(".prod-card-item");
let prodDisplay = document.querySelector(".prod-display");

window.addEventListener('DOMContentLoaded', (e) => {
    setTimeout(() => {
        let topFeaturedProd = document.querySelector(".top-featured");
        prodDisplay.style.opacity = 1;
        topFeaturedProd.style.transform = `translateY(${-50}px)`;
        topFeaturedProd.style.opacity = 0;
    }, 3000);
    setTimeout(() => {
        prodDisplay.style.zIndex = 50;
    }, 4000);

})
productItemCard.forEach((item) => {
    item.addEventListener('mouseenter', (e) => {
        let prodTitle = item.querySelector(".prod-title").textContent;
        let prodDesc = item.querySelector(".prod-desc").textContent;
        let prodImgElem = item.querySelector("img");
        let prodImg = prodImgElem.getAttribute("src");
        document.querySelector(".prod-ds-title h2").textContent = prodTitle
        document.querySelector(".prod-ds-desc p").textContent = prodDesc
        let dsProdImg = document.querySelector(".prod-ds-img img");
        dsProdImg.setAttribute("src", prodImg);
    });
});

function detectMouseHover() {
    prodDisplay.addEventListener("mouseenter", (e) => {
        mouseDetected = true;
    });
    prodDisplay.addEventListener("mouseleave", (e) => {
        mouseDetected = false;
    });
}

var x;
var y;
let circle = document.querySelector(".circle");
let prodCardItem = document.querySelectorAll(".prod-card-item");
window.addEventListener("mousemove", (e) => {
    detectMouseHover();
    x = e.clientX;
    y = e.clientY;
    if (mouseDetected) {
        circle.style.opacity = 1;
        circle.style.transform = `translate(${x - 6}px, ${y - 125}px)`;
    }
    else {
        circle.style.opacity = 0;
    }
});
