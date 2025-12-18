// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add active class to current navigation item
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-menu a');

// Combined scroll event handler for better performance
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            // Update navbar shadow
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }
            
            // Update active navigation item
            // Find the section that is currently in view by checking bounds
            let current = '';
            const scrollOffset = 200; // Offset to trigger section change before reaching it
            
            // Iterate through sections to find which one contains the current scroll position
            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionBottom = sectionTop + sectionHeight;
                
                // Check if scroll position is within this section's bounds (with offset)
                if (currentScroll >= sectionTop - scrollOffset && currentScroll < sectionBottom - scrollOffset) {
                    current = section.getAttribute('id');
                    break; // Found the active section, no need to check further
                }
            }

            // If no section matches (e.g., at the very top or past last section), 
            // find the closest section
            if (!current && sections.length > 0) {
                // If scrolled past all sections, use the last one
                const lastSection = sections[sections.length - 1];
                if (currentScroll >= lastSection.offsetTop - scrollOffset) {
                    current = lastSection.getAttribute('id');
                } else {
                    // Otherwise use the first section
                    current = sections[0].getAttribute('id');
                }
            }

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            lastScroll = currentScroll;
            ticking = false;
        });
        ticking = true;
    }
});

