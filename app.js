const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}
// Check saved theme
const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {

    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark-mode");
        themeBtn.textContent = "🌙";
    }

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){
            localStorage.setItem("theme","dark");
            themeBtn.textContent="🌙";
        }else{
            localStorage.setItem("theme","light");
            themeBtn.textContent="☀️";
        }

    });
}
const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if(window.scrollY > 30){
            topBtn.style.display="flex";
        }else{
            topBtn.style.display="none";
        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}

const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

if (slides.length && next && prev) {

    let current = 0;

    function showSlide(index){
        slides.forEach(slide=>{
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    next.addEventListener("click",()=>{

        current = (current + 1) % slides.length;
        showSlide(current);

    });

    prev.addEventListener("click",()=>{

        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);

    });

}
const form = document.getElementById("contactform");

if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        // Name validation
        if (name.length < 3) {
            alert("Name must contain at least 3 characters.");
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Phone validation (optional)
        if (phone !== "") {
            const phonePattern = /^[0-9]{10}$/;

            if (!phonePattern.test(phone)) {
                alert("Phone number must contain exactly 10 digits.");
                return;
            }
        }

        // Message validation
        if (message.trim().length < 10) {
            alert("Message must be at least 10 characters long.");
            return;
        }

        alert("🚀 Message sent successfully!");

        form.reset();

    });

}
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;
            const speed = target / 100;

            const updateCounter = () => {

                if (count < target) {

                    count += speed;
                    counter.textContent = Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target + "+";

                }

            };

            updateCounter();

            observer.unobserve(counter);

        }

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => observer.observe(counter));