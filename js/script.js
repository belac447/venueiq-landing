// ============================================================================
// VenueIQ Landing Page JavaScript
// Supercharged interactions and animations
// ============================================================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 50
});

// ============================================================================
// SMOOTH SCROLLING
// ============================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================================================
// MOBILE MENU TOGGLE
// ============================================================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ============================================================================
// HEADER SCROLL EFFECT
// ============================================================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    // Hide header on scroll down, show on scroll up
    if (currentScroll > 100) {
        if (currentScroll > lastScroll) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScroll = currentScroll;
});

// ============================================================================
// ANIMATED COUNTERS (Disabled for static honest stats)
// ============================================================================
// Counters removed - showing honest static numbers instead
// No fake "counting up" to pretend we have traction we don't have yet

// ============================================================================
// COPY CREDENTIALS TO CLIPBOARD
// ============================================================================
window.copyCredential = function(element) {
    const text = element.textContent;
    
    // Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
        const originalText = element.textContent;
        const originalBg = element.style.background;
        
        // Show success feedback
        element.textContent = '✓ Copied!';
        element.style.background = '#00C897';
        element.style.color = 'white';
        element.style.borderColor = '#00C897';
        
        // Reset after 1.5 seconds
        setTimeout(() => {
            element.textContent = originalText;
            element.style.background = originalBg;
            element.style.color = '';
            element.style.borderColor = '';
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
};

// ============================================================================
// PARALLAX EFFECT FOR GRADIENT ORBS
// ============================================================================
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ============================================================================
// FEATURE CARD TILT EFFECT (3D hover)
// ============================================================================
const featureCards = document.querySelectorAll('.feature-card, .step-card');

featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ============================================================================
// BUTTON RIPPLE EFFECT
// ============================================================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    /* Mobile menu active state */
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            padding: 2rem;
            gap: 1.5rem;
            border-bottom: 1px solid var(--border);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
`;
document.head.appendChild(style);

// ============================================================================
// DEMO WINDOW GLOW EFFECT
// ============================================================================
const demoWindow = document.querySelector('.demo-window');

if (demoWindow) {
    demoWindow.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 30px 80px rgba(108, 99, 255, 0.3)';
    });
    
    demoWindow.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
    });
}

// ============================================================================
// SCROLL PROGRESS INDICATOR
// ============================================================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #6C63FF 0%, #00C897 100%);
    z-index: 9999;
    transition: width 0.1s ease-out;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ============================================================================
// LAZY LOAD OPTIMIZATION
// ============================================================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}

// ============================================================================
// EASTER EGG: Konami Code
// ============================================================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Trigger confetti or special effect
        console.log('🎉 Konami Code activated!');
        document.querySelectorAll('.gradient-orb').forEach(orb => {
            orb.style.animation = 'float 2s ease-in-out infinite, spin 10s linear infinite';
        });
    }
});

const spinKeyframes = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
const spinStyle = document.createElement('style');
spinStyle.textContent = spinKeyframes;
document.head.appendChild(spinStyle);

// ============================================================================
// INITIALIZE ON DOM READY
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 VenueIQ Landing Page Loaded', 'font-size: 20px; font-weight: bold; color: #6C63FF;');
    console.log('%cBuilt with ❤️ for modern restaurants', 'font-size: 14px; color: #00C897;');
    
    // Add entrance animation to hero elements
    const heroElements = document.querySelectorAll('.hero .demo-badge, .hero .hero-title, .hero .hero-subtitle, .hero .hero-cta, .hero .trust-indicators');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Initialize contact form
    initContactForm();
});

// ============================================================================
// CONTACT FORM HANDLING
// ============================================================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            venueName: document.getElementById('venueName').value,
            interest: document.getElementById('interest').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
        formStatus.style.display = 'block';
        formStatus.className = 'form-status loading';
        formStatus.textContent = 'Sending your message...';
        
        try {
            // Use Formspree endpoint - Replace with your actual Formspree form ID
            // Get yours at https://formspree.io/
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                // Success
                formStatus.className = 'form-status success';
                formStatus.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
                contactForm.reset();
                
                // Track conversion (if Analytics is set up)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'contact_form_submit', {
                        'event_category': 'engagement',
                        'event_label': formData.interest
                    });
                }
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error state
            formStatus.className = 'form-status error';
            formStatus.textContent = '✗ Oops! Something went wrong. Please try emailing contact@venueiq.app directly.';
            console.error('Form submission error:', error);
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            
            // Hide status after 10 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 10000);
        }
    });
}

// ============================================================================
// PREVENT FLASH OF UNSTYLED CONTENT
// ============================================================================
document.documentElement.classList.add('js-enabled');

// ============================================================================
// BACK TO TOP BUTTON
// ============================================================================
(function() {
    // Create back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
    `;
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 24px rgba(108, 99, 255, 0.4);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateY(20px);
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide button on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        
        if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
            backToTop.style.transform = 'translateY(20px)';
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Track interaction
        if (typeof gtag !== 'undefined') {
            gtag('event', 'back_to_top', {
                'event_category': 'navigation',
                'event_label': 'scroll_top_button'
            });
        }
    });
    
    // Hover effect
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 8px 32px rgba(108, 99, 255, 0.5)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 24px rgba(108, 99, 255, 0.4)';
    });
    
    // Add responsive styles
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleMobile(e) {
        if (e.matches) {
            backToTop.style.bottom = '1rem';
            backToTop.style.right = '1rem';
            backToTop.style.width = '48px';
            backToTop.style.height = '48px';
        } else {
            backToTop.style.bottom = '2rem';
            backToTop.style.right = '2rem';
            backToTop.style.width = '56px';
            backToTop.style.height = '56px';
        }
    }
    
    mediaQuery.addListener(handleMobile);
    handleMobile(mediaQuery);
})();

// ============================================================================
// ENHANCED IMAGE LAZY LOADING
// ============================================================================
(function() {
    // Lazy load images with data-src attribute
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Handle both img tags and background images
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    
                    if (img.dataset.bg) {
                        img.style.backgroundImage = `url(${img.dataset.bg})`;
                        img.removeAttribute('data-bg');
                        img.classList.add('loaded');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px', // Start loading 50px before entering viewport
            threshold: 0.01
        });
        
        // Observe all images with data-src or data-bg
        document.querySelectorAll('img[data-src], [data-bg]').forEach(img => {
            imageObserver.observe(img);
        });
        
        // Re-observe when new images are added dynamically
        window.lazyLoadNewImages = function() {
            document.querySelectorAll('img[data-src]:not(.observed), [data-bg]:not(.observed)').forEach(img => {
                img.classList.add('observed');
                imageObserver.observe(img);
            });
        };
    } else {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
        
        document.querySelectorAll('[data-bg]').forEach(el => {
            el.style.backgroundImage = `url(${el.dataset.bg})`;
            el.removeAttribute('data-bg');
        });
    }
})();
