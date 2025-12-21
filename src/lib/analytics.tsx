/**
 * Google Analytics 4 (GA4) Tracking Implementation
 * 
 * This module provides Google Analytics tracking for the AXS Map web application.
 * It handles pageviews and custom events using gtag.js.
 */

import Script from 'next/script';

// Get GA4 Measurement ID from environment variables
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Google Analytics Scripts Component
 * 
 * Add this component to your root layout to load GA tracking scripts.
 * Uses Next.js Script component for optimized loading.
 */
export function GoogleAnalytics() {
  // Don't load GA in development or if measurement ID is not set
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'YOUR_GA4_MEASUREMENT_ID') {
    return null;
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: false
            });
          `,
        }}
      />
    </>
  );
}

/**
 * Track a pageview event
 * 
 * Call this function when the route changes to track pageviews.
 * 
 * @param url - The full URL of the page being viewed
 */
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'YOUR_GA4_MEASUREMENT_ID') {
    return;
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

/**
 * Track a custom event
 * 
 * Use this to track user interactions and custom events.
 * 
 * @param action - The action being tracked (e.g., 'click', 'submit', 'search')
 * @param category - The category of the event (e.g., 'engagement', 'conversion')
 * @param label - Optional label for additional context
 * @param value - Optional numeric value associated with the event
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'YOUR_GA4_MEASUREMENT_ID') {
    return;
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Example custom events for AXS Map specific tracking:
 */

// Track when a user searches for a venue
export const trackSearch = (searchTerm: string) => {
  event({
    action: 'search',
    category: 'engagement',
    label: searchTerm,
  });
};

// Track when a user views a venue detail page
export const trackVenueView = (venueId: string, venueName?: string) => {
  event({
    action: 'view_venue',
    category: 'engagement',
    label: venueName || venueId,
  });
};

// Track when a user submits a review
export const trackReviewSubmit = (venueId: string) => {
  event({
    action: 'submit_review',
    category: 'conversion',
    label: venueId,
  });
};

// Track when a user signs up
export const trackSignup = (method: string) => {
  event({
    action: 'sign_up',
    category: 'conversion',
    label: method, // e.g., 'google', 'facebook', 'email'
  });
};

// Track when a user logs in
export const trackLogin = (method: string) => {
  event({
    action: 'login',
    category: 'engagement',
    label: method,
  });
};

// Track mapathon interactions
export const trackMapathonView = (mapathonId: string, mapathonName?: string) => {
  event({
    action: 'view_mapathon',
    category: 'engagement',
    label: mapathonName || mapathonId,
  });
};

// Track filter usage
export const trackFilterUse = (filterType: string, filterValue: string) => {
  event({
    action: 'use_filter',
    category: 'engagement',
    label: `${filterType}: ${filterValue}`,
  });
};
