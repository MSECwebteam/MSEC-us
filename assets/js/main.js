const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

console.log("main.js loaded");

menuToggle.addEventListener("click", () => {

    console.log("Hamburger clicked");

    mobileMenu.classList.toggle("active");

});