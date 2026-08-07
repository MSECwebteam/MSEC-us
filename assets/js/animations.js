/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(`
    .service-card,
    .about-heading,
    .about-copy,
    .about-logo,
    .about-divider,
    .mindset-quote,
    .mindset-copy,
    .value-card,
    .about-cta
`);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach((element) => {

    revealObserver.observe(element);

});