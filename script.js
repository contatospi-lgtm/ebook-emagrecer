// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// FAQ Toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Countdown Timer
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Set initial time (23 hours, 59 minutes, 59 seconds)
    let totalSeconds = 23 * 3600 + 59 * 60 + 59;
    
    function updateCountdown() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            // Reset countdown when it reaches 0
            totalSeconds = 23 * 3600 + 59 * 60 + 59;
        }
    }
    
    // Update immediately
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Purchase redirect function
function redirectToPurchase() {
    // In a real implementation, this would redirect to a payment processor
    // For demo purposes, we'll show an alert
    alert('Redirecionando para o checkout seguro...\n\nEm um site real, isso levaria você para uma página de pagamento segura (como Stripe, PayPal, PagSeguro, etc.)');
    
    // Example of what the real implementation might look like:
    // window.location.href = 'https://checkout.stripe.com/pay/...';
    // or
    // window.location.href = 'https://www.paypal.com/checkout/...';
    // or
    // window.location.href = 'checkout.html';
}

// Intersection Observer for animations
function setupScrollAnimations() {
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.problem-item, .benefit, .feature-card, .testimonial');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Button hover effects
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.cta-button, .final-cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
        });
    });
}

// Mobile menu toggle (for future enhancement)
function setupMobileMenu() {
    // This would be implemented if we add a mobile hamburger menu
    // For now, the mobile menu is hidden in CSS
}

// Form validation (for future contact forms)
function setupFormValidation() {
    // This would be implemented if we add contact or newsletter forms
}

// Analytics tracking (for future implementation)
function trackEvent(eventName, eventData) {
    // This would integrate with Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', eventName, eventData);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    handleHeaderScroll();
    setupScrollAnimations();
    setupButtonEffects();
    setupMobileMenu();
    setupFormValidation();
    
    // Track page load
    trackEvent('page_load', {
        page: 'landing_page',
        timestamp: new Date().toISOString()
    });
});

// Track CTA clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button') || e.target.classList.contains('final-cta-button')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent.trim(),
            timestamp: new Date().toISOString()
        });
    }
});

// Prevent right-click on images (optional protection)
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Lazy loading for images (modern browsers)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for older browsers
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                trackEvent('performance', {
                    load_time: loadTime,
                    dom_content_loaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart
                });
            }, 0);
        });
    }
}

measurePerformance();

