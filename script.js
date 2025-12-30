// ========================================
// Mobile Menu Toggle
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');

            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!event.target.closest('.nav-wrapper')) {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
});

// ========================================
// Tool Search Functionality
// ========================================
const toolSearch = document.getElementById('toolSearch');
if (toolSearch) {
    toolSearch.addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const toolCards = document.querySelectorAll('.tool-card');

        toolCards.forEach(card => {
            const title = card.querySelector('.tool-title').textContent.toLowerCase();
            const description = card.querySelector('.tool-description').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'flex';
                // Add animation
                card.style.animation = 'fadeInUp 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });

        // Show "no results" message if needed
        const visibleCards = Array.from(toolCards).filter(card => card.style.display !== 'none');
        const toolsGrid = document.getElementById('toolsGrid');
        let noResultsMsg = document.getElementById('noResultsMessage');

        if (visibleCards.length === 0 && searchTerm !== '') {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'noResultsMessage';
                noResultsMsg.className = 'no-results';
                noResultsMsg.innerHTML = `
                    <div style="text-align: center; padding: 3rem; color: #5f6368;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
                        <h3>No tools found</h3>
                        <p>Try searching with different keywords</p>
                    </div>
                `;
                toolsGrid.appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    });
}

// ========================================
// Category Filter Functionality
// ========================================
const categoryButtons = document.querySelectorAll('.category-btn');
const toolCards = document.querySelectorAll('.tool-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const category = this.getAttribute('data-category');

        // Filter tools
        toolCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
                card.style.animation = 'fadeInUp 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });

        // Clear search when filtering by category
        if (toolSearch) {
            toolSearch.value = '';
        }

        // Remove no results message if exists
        const noResultsMsg = document.getElementById('noResultsMessage');
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
    });
});

// ========================================
// Tool Opening Functionality
// ========================================
function openTool(toolName) {
    const toolMap = {
        'wordCounter': 'ready-tools/word-counter.html',
        'caseConverter': 'ready-tools/case-converter.html',
        'textTrimmer': 'ready-tools/text-trimmer.html',
        'textReverser': 'ready-tools/text-reverser.html',
        'imageResizer': 'ready-tools/image-resizer.html',
        'imageCompressor': 'ready-tools/image-compressor.html',
        'imageConverter': 'ready-tools/image-converter.html',
        'imageFilter': 'ready-tools/image-filter.html',
        'base64Encoder': 'ready-tools/base64-encoder.html',
        'colorPicker': 'ready-tools/color-picker.html',
        'jsonFormatter': 'ready-tools/json-formatter.html',
        'urlEncoder': 'ready-tools/url-encoder.html',
        'ageCalculator': 'ready-tools/age-calculator.html',
        'percentageCalculator': 'ready-tools/percentage-calculator.html',
        'bmiCalculator': 'ready-tools/bmi-calculator.html',
        'dateCalculator': 'ready-tools/date-calculator.html',
        'unitConverter': 'ready-tools/unit-converter.html',
        'currencyConverter': 'ready-tools/currency-converter.html',
        'temperatureConverter': 'ready-tools/temperature-converter.html',
        'weightConverter': 'ready-tools/weight-converter.html'
    };

    if (toolMap[toolName]) {
        window.location.href = toolMap[toolName];
    } else {
        console.error('Tool URL not found for:', toolName);
        alert('This tool is currently under maintenance. Please try again later.');
    }
}

// ========================================
// Contact Form Handling
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual backend call)
        setTimeout(() => {
            // In WordPress, you would send this to a PHP handler or use AJAX
            console.log('Form submitted:', formData);

            // Show success message
            showFormMessage('Thank you for your message! We\'ll get back to you within 24-48 hours.', 'success');

            // Reset form
            contactForm.reset();

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// Scroll to Top Button
// ========================================
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 999;
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ========================================
// Lazy Loading for Images (if added later)
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Add Animation on Scroll
// ========================================
function animateOnScroll() {
    const elements = document.querySelectorAll('.tool-card, .feature-card, .faq-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations
animateOnScroll();

// ========================================
// Performance Optimization
// ========================================
// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to search if it exists
if (toolSearch) {
    const debouncedSearch = debounce(function (e) {
        // Search logic is already in the input event listener above
    }, 300);
}

// ========================================
// AdSense Integration Helper
// ========================================
// This function helps identify ad placement areas
function initAdPlacements() {
    // Ad placements will be added in WordPress
    // This is a helper to mark potential ad zones
    const adZones = [
        { location: 'header', selector: '.hero' },
        { location: 'sidebar', selector: '.sidebar' },
        { location: 'content', selector: '.content-article' },
        { location: 'footer', selector: '.footer' }
    ];

    // Log ad zones for reference (remove in production)
    console.log('Ad placement zones identified:', adZones.length);
}

initAdPlacements();

// ========================================
// WordPress Integration Helpers
// ========================================
// These functions will be useful when integrating with WordPress

// Function to handle dynamic tool loading
function loadToolContent(toolId) {
    // In WordPress, this would fetch tool content via AJAX
    console.log('Loading tool content for:', toolId);
}

// Function to track tool usage (for analytics)
function trackToolUsage(toolName) {
    // In WordPress, this would send analytics data
    console.log('Tool used:', toolName);

    // Example: Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'tool_usage', {
            'event_category': 'Tools',
            'event_label': toolName
        });
    }
}

// ========================================
// Accessibility Enhancements
// ========================================
// Add keyboard navigation for tool cards
document.querySelectorAll('.tool-btn').forEach(button => {
    button.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    announcement.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcement);

    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// ========================================
// Console Welcome Message
// ========================================
console.log('%c🚀 Welcome to ToolGoAI!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ for students, freelancers, developers, designers, and marketers', 'color: #5f6368; font-size: 12px;');
console.log('%cAll tools run locally in your browser - your data never leaves your device!', 'color: #34a853; font-size: 12px;');

// ========================================
// Error Handling
// ========================================
window.addEventListener('error', function (e) {
    console.error('An error occurred:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function (e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// ========================================
// Service Worker Registration (for PWA - optional)
// ========================================
if ('serviceWorker' in navigator) {
    // Uncomment when you have a service worker file
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
}

// ========================================
// Export functions for WordPress integration
// ========================================
window.ToolGoAI = {
    openTool,
    loadToolContent,
    trackToolUsage,
    showFormMessage,
    announceToScreenReader
};
