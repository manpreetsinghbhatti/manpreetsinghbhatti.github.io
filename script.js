// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const backToTopBtn = document.getElementById('backToTop');

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show loading
            showLoading();
            
            // Remove active class from all links and sections
            navLinks.forEach(nl => nl.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section with delay for loading effect
            setTimeout(() => {
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
                hideLoading();
            }, 500);
        });
    });

    // Handle scroll events for back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Smooth scroll behavior for navigation
    document.documentElement.style.scrollBehavior = 'smooth';
});

function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.education-item, .experience-item, .award-item, .timeline-item');
    
    items.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
});

// Add typing effect to name
document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.querySelector('.name');
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            nameElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
});

// Print functionality
function printCV() {
    window.print();
}

// Download CV as PDF (placeholder - would need PDF library in real implementation)
function downloadPDF() {
    alert('PDF download functionality would be implemented with a PDF library like jsPDF');
}

// Search functionality
function searchCV() {
    const searchTerm = prompt('Search CV content:');
    if (searchTerm) {
        const content = document.querySelector('.content');
        const text = content.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            alert('Found: ' + searchTerm);
            // Highlight functionality could be added here
        } else {
            alert('Not found: ' + searchTerm);
        }
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navList = document.querySelector('.nav-list');
    navList.style.display = navList.style.display === 'none' ? 'flex' : 'none';
}

function toggleOlderPublications() {
    const olderPubs = document.getElementById('older-publications');
    const toggleText = document.getElementById('toggle-text');
    const toggleIcon = document.getElementById('toggle-icon');
    const toggleButton = document.querySelector('.collapse-toggle');
    
    if (olderPubs.style.display === 'none') {
        olderPubs.style.display = 'block';
        toggleText.textContent = 'Hide Earlier Publications (2009-2018)';
        toggleIcon.classList.add('expanded');
        toggleButton.classList.add('expanded');
    } else {
        olderPubs.style.display = 'none';
        toggleText.textContent = 'Show Earlier Publications (2009-2018)';
        toggleIcon.classList.remove('expanded');
        toggleButton.classList.remove('expanded');
    }
}

// Initialize animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.education-item, .experience-item, .award-item, .skill-category, .stat-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let count = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(count);
            }
        }, 50);
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        statsObserver.observe(statsGrid);
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const activeLink = document.querySelector('.nav-link.active');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentIndex = Array.from(navLinks).indexOf(activeLink);
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navLinks[currentIndex - 1].click();
    } else if (e.key === 'ArrowRight' && currentIndex < navLinks.length - 1) {
        navLinks[currentIndex + 1].click();
    }
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .nav-link');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button, .nav-link {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Theme switcher (optional feature)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    // Save theme preference
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Performance optimization - lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && typeof callback === 'function') {
        callback(element);
    }
}

// Initialize all functionality safely
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation with error handling
    safeQuerySelector('.nav-list', (navList) => {
        console.log('Navigation initialized');
    });
    
    // Initialize back to top button
    safeQuerySelector('#backToTop', (btn) => {
        console.log('Back to top button initialized');
    });
    
    console.log('CV website fully loaded and initialized');
});