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

// Animate numbers function
function animateNumbers() {
    const counters = document.querySelectorAll('.cont1 h1');
    const animationDuration = 3000; // 3 seconds
    const frameDuration = 1000 / 60; // 60 frames per second

    counters.forEach(counter => {
        const target = parseInt(counter.innerText.replace(/,/g, ''));
        const startTime = Date.now();
        
        // Format number with commas
        const formatNumber = num => num.toLocaleString();

        const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);
            const currentNumber = Math.floor(progress * target);

            counter.textContent = formatNumber(currentNumber);

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = formatNumber(target);
            }
        };

        requestAnimationFrame(updateCounter);
    });
}

// Initialize animation when element comes into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.disconnect();
        }
    });
});

// Observe the stats section
const statsSection = document.querySelector('.horizontal');
if (statsSection) {
    observer.observe(statsSection);
}

// To open and close collapsible navbar
function toggleMenu() {
    document.querySelector('.mobile-menu').classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    let menu = document.querySelector('.mobile-menu');
    let icon = document.querySelector('.menu-icon');
    if (!menu.contains(event.target) && !icon.contains(event.target)) {
        menu.classList.remove('active');
    }
});