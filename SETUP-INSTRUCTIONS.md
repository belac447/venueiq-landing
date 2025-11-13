# VenueIQ Landing Page - Setup Instructions

## 🚀 Quick Setup Guide

### 1. Contact Form Setup (Formspree)

The contact form uses Formspree for free form handling (no backend needed).

**Steps:**
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account
3. Create a new form
4. Copy your form ID (the part after `/f/` in your endpoint, e.g., `xpzgkjqr`)
5. **🔒 SECURE SETUP:** Go to your Netlify dashboard → Site Settings → Environment Variables
6. Add a new variable:
   - **Key:** `FORMSPREE_FORM_ID`
   - **Value:** Your actual form ID (e.g., `xpzgkjqr`)
   - **Scopes:** All scopes

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
4. **🔒 SECURE SETUP:** Go to your Netlify dashboard → Site Settings → Environment Variables
5. Add a new variable:
   - **Key:** `GA_MEASUREMENT_ID`
   - **Value:** Your actual GA4 Measurement ID (e.g., `G-ABC123DEF4`)
   - **Scopes:** All scopes

**What's tracked automatically:**
- Page views on all pages
- Demo app launches
- Contact form submissions
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page
- Outbound links
- Form interactions

---

## 🔒 Security & API Keys

**🚨 IMPORTANT:** Your API keys are now securely stored as environment variables and will never be exposed in your code repository.

### What Changed:
- **Before:** API keys were hardcoded in JavaScript files (insecure)
- **After:** API keys are injected at build time via environment variables (secure)

### Environment Variables Set Up:
1. **GA_MEASUREMENT_ID** - Your Google Analytics 4 measurement ID
2. **FORMSPREE_FORM_ID** - Your Formspree form identifier

### Why This is Secure:
- ✅ API keys are not in your GitHub repository
- ✅ Different keys for staging/production if needed
- ✅ Keys can be rotated without code changes
- ✅ No risk of accidental commits
- ✅ Netlify handles variable substitution automatically

### Setting Environment Variables in Netlify:
1. Go to your [Netlify dashboard](https://app.netlify.com/)
2. Select your site → **Site Settings** → **Environment Variables**
3. Click **"Add variable"**
4. Enter the key and value
5. Deploy to apply changes

---

## 📊 Analytics Events Reference

### 3. Demo App Firebase Setup (Interactive Demo)

The interactive demo requires Firebase configuration for data storage and authentication.

**Steps:**
1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Create a new Firebase project (or use existing demo project)
3. Go to Project Settings → General → Your apps → Add Web App
4. Copy the Firebase config values
5. **🔒 SECURE SETUP:** Go to your Netlify dashboard → Site Settings → Environment Variables
6. Add these variables:
   - **Key:** `DEMO_FIREBASE_API_KEY` → **Value:** Your Firebase API key
   - **Key:** `DEMO_FIREBASE_AUTH_DOMAIN` → **Value:** Your Firebase auth domain
   - **Key:** `DEMO_FIREBASE_PROJECT_ID` → **Value:** Your Firebase project ID
   - **Key:** `DEMO_FIREBASE_STORAGE_BUCKET` → **Value:** Your Firebase storage bucket
   - **Key:** `DEMO_FIREBASE_MESSAGING_SENDER_ID` → **Value:** Your messaging sender ID
   - **Key:** `DEMO_FIREBASE_APP_ID` → **Value:** Your Firebase app ID
   - **Key:** `DEMO_FIREBASE_MEASUREMENT_ID` → **Value:** Your GA measurement ID (optional)

**Security Note:** These Firebase keys are for the demo environment only and should be separate from your production Firebase project.
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
