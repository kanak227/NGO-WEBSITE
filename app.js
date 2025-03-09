const scrollToTopBtn = document.getElementById("scrollToTop");
const progressCircle = document.getElementById("progress");
const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

// Show/hide button based on scroll position
window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    let progress = (scrollTop / documentHeight) * 138; // 138 is full circumference

    progressCircle.style.strokeDashoffset = 138 - progress;

    if (scrollTop > 200) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }
});

// Smooth scroll to top
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
