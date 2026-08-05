window.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    console.log("Button:", menuToggle);
    console.log("Menu:", mobileMenu);

    menuToggle.addEventListener("click", () => {

        console.log("CLICKED!");

        mobileMenu.classList.toggle("active");

    });

});
