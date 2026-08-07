/* ============================
   Service Card Animation
============================ */

const serviceCards = document.querySelectorAll(".service-card");

const serviceObserver = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

            serviceObserver.unobserve(entry.target);

        }

    });

},{
    threshold:.15
});

serviceCards.forEach(card=>{

    serviceObserver.observe(card);

});
