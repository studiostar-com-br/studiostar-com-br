// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');
const header = document.getElementById('header');
const backToTopBtn = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Mobile Menu Functions
function openMenu() {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenuMobile() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event Listeners for Mobile Menu
menuToggle.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuMobile);
overlay.addEventListener('click', closeMenuMobile);

// Close menu when clicking on a link
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenuMobile);
});

// Scroll Functions
function toggleHeaderBackground() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function toggleBackToTopButton() {
    if (window.scrollY > 700) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
}

// Scroll to sections smoothly
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe elements for animation
document.querySelectorAll('.service-card, .team-member, .benefit-item').forEach(item => {
    observer.observe(item);
});

// Active Navigation
function highlightNavOnScroll() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Service Cards Hover Effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const btn = card.querySelector('.btn-service');
        if (btn) {
            btn.classList.add('animate-pulse');
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const btn = card.querySelector('.btn-service');
        if (btn) {
            btn.classList.remove('animate-pulse');
        }
    });
});

// Add CSS for animation that isn't in the original CSS
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.8s ease forwards;
    }
    
    .animate-pulse {
        animation: pulse 1.5s infinite;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Event Listeners
window.addEventListener('scroll', () => {
    toggleHeaderBackground();
    toggleBackToTopButton();
    highlightNavOnScroll();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    toggleHeaderBackground();
    toggleBackToTopButton();
    highlightNavOnScroll();
    
    // Add initial animations
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('animate-fade-in');
    }, 300);
});

// Preload images for better performance
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const newImg = new Image();
            newImg.src = src;
        }
    });
}

// Call preload function
window.addEventListener('load', preloadImages);