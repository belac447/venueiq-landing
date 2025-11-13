// ============================================================================
// Google Analytics 4 (GA4) Tracking
// Replace GA_MEASUREMENT_ID with your actual GA4 Measurement ID
// Get your ID from: https://analytics.google.com/
// ============================================================================

// Initialize Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

// Configure GA4 - Replace 'G-XXXXXXXXXX' with your actual Measurement ID
gtag('config', 'G-XXXXXXXXXX', {
    'send_page_view': true,
    'anonymize_ip': true, // Privacy-friendly
    'cookie_flags': 'SameSite=None;Secure'
});

// ============================================================================
// Custom Event Tracking
// ============================================================================

// Track CTA button clicks
document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-track]');
    if (!target) return;
    
    const action = target.dataset.track;
    const label = target.textContent.trim() || target.getAttribute('aria-label');
    
    gtag('event', action, {
        'event_category': 'engagement',
        'event_label': label
    });
});

// Track demo launch clicks
document.addEventListener('click', (e) => {
    const demoLink = e.target.closest('a[href*="restaurant-dashboard"]');
    if (demoLink) {
        gtag('event', 'demo_launch', {
            'event_category': 'engagement',
            'event_label': 'Launch App Click'
        });
    }
});

// Track pricing page visits
if (window.location.pathname.includes('pricing')) {
    gtag('event', 'page_view', {
        'page_title': 'Pricing Page',
        'event_category': 'page_view',
        'event_label': 'high_intent'
    });
}

// Track form interactions
const formInputs = document.querySelectorAll('form input, form textarea, form select');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        gtag('event', 'form_start', {
            'event_category': 'engagement',
            'event_label': this.id || this.name
        });
    }, { once: true });
});

// Track scroll depth
let scrollDepth = 0;
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = Math.round((window.pageYOffset / windowHeight) * 100);
    
    if (scrolled > scrollDepth && scrolled % 25 === 0) {
        scrollDepth = scrolled;
        gtag('event', 'scroll_depth', {
            'event_category': 'engagement',
            'event_label': scrollDepth + '%',
            'value': scrollDepth
        });
    }
});

// Track time on page
let pageStartTime = Date.now();
window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
    gtag('event', 'time_on_page', {
        'event_category': 'engagement',
        'value': timeOnPage
    });
});

// Track outbound links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.hostname !== window.location.hostname && link.href) {
        gtag('event', 'outbound_link', {
            'event_category': 'engagement',
            'event_label': link.href
        });
    }
});

console.log('📊 Analytics initialized - Remember to replace GA_MEASUREMENT_ID with your actual ID');
