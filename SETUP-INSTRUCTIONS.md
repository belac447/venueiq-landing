# VenueIQ Landing Page - Setup Instructions

## 🚀 Quick Setup Guide

### 1. Contact Form Setup (Formspree)

The contact form uses Formspree for free form handling (no backend needed).

**Steps:**
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account
3. Create a new form
4. Copy your form endpoint (looks like `https://formspree.io/f/xpzgkjqr`)
5. Open `js/script.js` and find line ~470:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
6. Replace `YOUR_FORM_ID` with your actual form ID

**Free tier includes:**
- 50 submissions per month
- Email notifications
- Spam filtering
- No credit card required

**Alternative options:**
- [Basin](https://usebasin.com/) - Another free form service
- [Netlify Forms](https://www.netlify.com/products/forms/) - If hosting on Netlify
- Firebase Functions - More complex but fully custom

---

### 2. Google Analytics Setup (GA4)

Track traffic, conversions, and user behavior.

**Steps:**
1. Go to [https://analytics.google.com/](https://analytics.google.com/)
2. Create a new GA4 property
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)
4. Replace `G-XXXXXXXXXX` in TWO places:
   - `index.html` line ~31: The gtag script source
   - `js/analytics.js` line ~12: The gtag config

**What's tracked automatically:**
- Page views on all pages
- Demo app launches
- Contact form submissions
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page
- Outbound links
- Form interactions

**Events tracked:**
- `demo_launch` - When users click demo links
- `contact_form_submit` - Form submissions
- `scroll_depth` - User engagement
- `form_start` - Form field interactions

---

### 3. Social Sharing Image (Open Graph)

Create a 1200x630px image for social media previews.

**Current placeholder:**
- `/images/og-image.jpg` (referenced but doesn't exist yet)

**Design tips:**
- Use your brand colors (#6C63FF, #00C897)
- Include logo and tagline
- Clear, readable text
- Tools: Canva, Figma, or Photoshop

**Upload location:**
```
s:\VS CODE APPS\venueiq-landing\images\og-image.jpg
```

---

### 4. Deploy Your Site

#### Option A: Deploy to Netlify (Recommended)

**First time setup:**
```powershell
# Login to Netlify (opens browser for authentication)
netlify login

# Initialize and link your site
netlify init
```

**Deploy commands:**
```powershell
# Deploy to draft URL (test deployment)
netlify deploy

# Deploy to production
netlify deploy --prod
```

**What Netlify provides:**
- Automatic HTTPS
- CDN distribution
- Continuous deployment from Git
- Form handling (Netlify Forms)
- Free tier: 100GB bandwidth/month
- Custom domain support

**Configuration:**
The `netlify.toml` file is already configured with:
- Security headers
- Cache control for static assets
- Redirect rules for pages

#### Option B: Deploy to Firebase

After making your changes:

```powershell
firebase deploy --only hosting
```

**Test your setup:**
1. Submit a test contact form
2. Check your email for Formspree notification
3. View GA4 Real-Time reports to see live traffic
4. Test social sharing with [Facebook Debugger](https://developers.facebook.com/tools/debug/)

---

## 📊 Analytics Events Reference

| Event Name | Trigger | Category | Label |
|------------|---------|----------|-------|
| `demo_launch` | Demo app link click | engagement | "Launch App Click" |
| `contact_form_submit` | Form submission | engagement | Interest type |
| `scroll_depth` | Scroll milestones | engagement | "25%", "50%", etc. |
| `form_start` | First form field focus | engagement | Field name |
| `outbound_link` | External link click | engagement | URL |
| `time_on_page` | Page unload | engagement | Seconds |

---

## 🔒 Privacy Considerations

Currently implemented:
- IP anonymization in GA4
- No cookies without consent (basic setup)
- Formspree GDPR compliant

**Consider adding:**
- Cookie consent banner (e.g., [Cookie Consent](https://www.osano.com/cookieconsent))
- Privacy policy page
- Terms of service

---

## 🎯 Next Steps

After setup is complete:
1. Test contact form with real submission
2. Monitor GA4 Real-Time to verify tracking
3. Create OG image for social sharing
4. Add meta tags to other pages (features, pricing, etc.)
5. Set up conversion goals in GA4
6. Create email templates for form submissions

---

## 💡 Pro Tips

**Formspree:**
- Set up custom thank you page redirect
- Configure notification emails
- Add honeypot spam protection

**Google Analytics:**
- Create custom dashboard for key metrics
- Set up conversion funnels
- Enable enhanced measurement
- Link to Google Search Console

**Performance:**
- Consider lazy loading the analytics script
- Add consent management for GDPR
- Test form submission speed

---

## 🆘 Troubleshooting

**Contact form not working:**
- Check browser console for errors
- Verify Formspree form ID is correct
- Test with network tab open to see requests

**Analytics not tracking:**
- Check GA4 Measurement ID is correct
- Verify script loads (Network tab)
- Look for errors in browser console
- Use GA4 DebugView for real-time testing

**Social sharing preview not showing:**
- Verify og-image.jpg exists and is 1200x630px
- Use Facebook Debugger to refresh cache
- Check image URL is absolute, not relative

---

## 📚 Resources

- [Formspree Documentation](https://help.formspree.io/)
- [GA4 Getting Started](https://support.google.com/analytics/answer/9304153)
- [Open Graph Protocol](https://ogp.me/)
- [Netlify CLI Documentation](https://docs.netlify.com/cli/get-started/)
- [Netlify Deployment Guide](https://docs.netlify.com/site-deploys/create-deploys/)
- [Firebase Hosting Guide](https://firebase.google.com/docs/hosting)

---

Built with ❤️ for VenueIQ
