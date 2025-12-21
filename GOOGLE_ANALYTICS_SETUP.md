# Google Analytics 4 Implementation Guide for AXS Map

## ✅ Implementation Complete

Google Analytics 4 (GA4) tracking has been successfully implemented for the AXS Map website. All necessary code is in place and ready to start tracking once you configure your GA4 Measurement ID.

---

## 🚀 Quick Start - What You Need to Do

### Step 1: Get Your GA4 Measurement ID

1. **Go to Google Analytics**: https://analytics.google.com
2. **Select your AXS Map property** (or create a new one if needed)
3. **Navigate to**: Admin (⚙️ icon) → Data Streams → Web Stream
4. **Copy your Measurement ID** - it looks like `G-XXXXXXXXXX`

### Step 2: Add Your Measurement ID to Environment Variables

1. Open the file: `.env.local` in the root of your project
2. Find this line:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=YOUR_GA4_MEASUREMENT_ID
   ```
3. Replace `YOUR_GA4_MEASUREMENT_ID` with your actual ID:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC1234567
   ```
4. **Save the file**

### Step 3: Restart Your Development Server

```bash
npm run dev
```

That's it! Google Analytics is now tracking your website. 🎉

---

## 📊 What's Been Implemented

### 1. **Core Analytics Files**
- ✅ `/src/lib/analytics.tsx` - GA4 initialization and event tracking functions
- ✅ `/src/components/AnalyticsTracker.tsx` - Automatic pageview tracking
- ✅ `/src/app/layout.tsx` - GA scripts loaded in root layout
- ✅ `/next.config.ts` - CSP headers configured to allow GA scripts
- ✅ `.env.local` - Environment variable added (needs your ID)

### 2. **Automatic Tracking**
Once your Measurement ID is configured, the following is tracked automatically:
- ✅ **Pageviews** - Every page navigation (client-side routing included)
- ✅ **Initial page loads** - When users first visit your site
- ✅ **Route changes** - When users navigate between pages

### 3. **Custom Event Tracking (Ready to Use)**
The implementation includes pre-built functions for AXS Map specific events:

```typescript
// Search tracking
trackSearch(searchTerm: string)

// Venue tracking
trackVenueView(venueId: string, venueName?: string)

// Review tracking
trackReviewSubmit(venueId: string)

// User authentication
trackSignup(method: string)  // e.g., 'google', 'facebook', 'email'
trackLogin(method: string)

// Mapathon tracking
trackMapathonView(mapathonId: string, mapathonName?: string)

// Filter tracking
trackFilterUse(filterType: string, filterValue: string)
```

**To use custom events**, import the function and call it where needed:

```typescript
import { trackVenueView } from '@/lib/analytics';

// In your component:
trackVenueView(venue.id, venue.name);
```

---

## 🧪 How to Test & Verify

### Method 1: Browser Network Tab (Easiest)
1. Open your website in Chrome/Firefox
2. Open Developer Tools (F12 or right-click → Inspect)
3. Go to the **Network** tab
4. Filter by: `google-analytics` or `collect`
5. Navigate between pages on your site
6. You should see requests to:
   - `https://www.googletagmanager.com/gtag/js?id=G-...`
   - `https://www.google-analytics.com/g/collect?...`

If you see these requests, **GA is working!** ✅

### Method 2: Google Analytics Realtime Reports
1. Go to Google Analytics: https://analytics.google.com
2. Select your **AXS Map property**
3. Go to **Reports** → **Realtime**
4. Open your website in another tab/window
5. Navigate around your site
6. You should see yourself as an active user in Realtime

**Note**: Data appears within 30 seconds in Realtime

### Method 3: Google Analytics Debug View (Advanced)
1. Install the [Google Analytics Debugger Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger)
2. Enable the extension
3. Open your website
4. Open Browser Console (F12)
5. Look for GA debug messages
6. In Google Analytics, go to **Admin** → **DebugView**
7. Navigate your site and see events appear in real-time

---

## 🔍 Troubleshooting

### "I don't see any data in Google Analytics"

**Check these things:**

1. **Is your Measurement ID correct?**
   - Open `.env.local`
   - Verify it starts with `G-` and matches your GA4 property
   - No extra spaces or quotes

2. **Did you restart your dev server after adding the ID?**
   ```bash
   npm run dev
   ```

3. **Check browser console for errors:**
   - Open Developer Tools → Console
   - Look for errors related to "googletagmanager" or "gtag"

4. **Is an ad blocker blocking GA?**
   - Disable ad blockers (uBlock Origin, Adblock Plus, etc.)
   - Or test in Incognito/Private browsing mode

5. **Check Network tab:**
   - Filter by `google-analytics` or `collect`
   - If you see requests, GA is firing correctly
   - If no requests, check your Measurement ID again

### "Build errors related to analytics"

If you see errors during `npm run build`:
- The current implementation has proper Suspense boundaries
- If issues persist, check that you haven't modified `AnalyticsTracker.tsx`

### "CSP (Content Security Policy) blocking GA scripts"

This has been configured in `next.config.ts`. The following domains are whitelisted:
- `https://www.googletagmanager.com`
- `https://www.google-analytics.com`
- `https://analytics.google.com`
- `https://stats.g.doubleclick.net`

---

## 📈 What Data Will You See?

After 24-48 hours of data collection, you'll see:

### Standard Reports
- **User demographics** (age, gender, location)
- **Traffic sources** (how users find your site)
- **Popular pages** (most visited venues, mapathons)
- **User engagement** (session duration, pages per session)
- **Device breakdown** (mobile vs desktop)
- **Real-time active users**

### Custom Events (When Implemented)
You can track custom events by using the tracking functions throughout your app:
- Venue searches
- Review submissions
- User signups/logins
- Mapathon participation
- Filter usage

---

## 🔐 Privacy & GDPR Compliance

### Current Implementation
- IP anonymization is **automatically enabled** in GA4
- No personally identifiable information (PII) is tracked by default
- Cookies are used for session tracking (standard GA behavior)

### If You Need Cookie Consent
If your users are in the EU/EEA or you need GDPR compliance, you should:

1. **Add a cookie consent banner** (e.g., using Cookiebot, OneTrust)
2. **Conditionally load GA** only after user consent:

```typescript
// In your consent handler:
if (userConsented) {
  // GA will load automatically since it's in the layout
  // Or call window.gtag('consent', 'update', {...})
}
```

3. **Update your Privacy Policy** to mention Google Analytics usage

---

## 🎯 Next Steps (Optional Enhancements)

### 1. Add Custom Event Tracking
Enhance user insights by adding tracking to key actions:

**Example: Track venue views**
```typescript
// In /src/app/(main)/venue/[id]/page.tsx
import { trackVenueView } from '@/lib/analytics';

useEffect(() => {
  if (venue) {
    trackVenueView(venue._id, venue.name);
  }
}, [venue]);
```

**Example: Track searches**
```typescript
// In your search component
import { trackSearch } from '@/lib/analytics';

const handleSearch = (term: string) => {
  trackSearch(term);
  // ... rest of search logic
};
```

### 2. Set Up Google Analytics 4 Goals/Conversions
Define what success looks like:
- User signup completion
- Review submission
- Mapathon registration
- Social media shares

Configure these in GA4: **Admin** → **Events** → **Mark as conversion**

### 3. Link with Google Search Console
Connect GA4 with Search Console to see:
- What keywords people search to find your site
- Click-through rates from Google search
- Page rankings

### 4. Set Up Custom Dashboards
Create dashboards for:
- Venue performance metrics
- Mapathon engagement
- User accessibility journey
- Mobile vs desktop usage

---

## 📞 Support & Resources

### Official Documentation
- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)

### Code Files Reference
| File | Purpose |
|------|---------|
| `.env.local` | Contains your GA Measurement ID |
| `src/lib/analytics.tsx` | GA initialization & tracking functions |
| `src/components/AnalyticsTracker.tsx` | Automatic pageview tracking |
| `src/app/layout.tsx` | Loads GA scripts site-wide |
| `next.config.ts` | Security headers for GA |

### Need Help?
If you encounter issues:
1. Check the troubleshooting section above
2. Verify your Measurement ID is correct
3. Test in the browser Network tab
4. Check Google Analytics Realtime view

---

## ✨ Summary Checklist

- [x] GA4 tracking code implemented
- [x] Environment variable added to `.env.local`
- [x] Automatic pageview tracking configured
- [x] Custom event functions ready to use
- [x] Content Security Policy configured
- [x] Build successful
- [ ] **YOU: Add your GA4 Measurement ID to `.env.local`**
- [ ] **YOU: Test in browser Network tab**
- [ ] **YOU: Verify data in GA Realtime reports**
- [ ] **YOU: (Optional) Add custom event tracking**

---

**🎉 Your Google Analytics implementation is complete and ready to track!**

Just add your Measurement ID to `.env.local` and you're all set.
