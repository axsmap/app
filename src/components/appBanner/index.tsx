import React, { useEffect, useState, useRef } from 'react';

function isIPadOS(userAgent: string) {
  // iPadOS 13+ often reports as Macintosh; touch support distinguishes it.
  return (
    /Macintosh/i.test(userAgent) &&
    typeof navigator !== 'undefined' &&
    (navigator as any).maxTouchPoints > 1
  );
}

function getMobileContext() {
  const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';

  // A conservative phone detection: if Android or iPhone/iPod is present, treat as phone.
  // (Android tablets can also include "Android"; we exclude common tablet hints below.)
  const isAndroid = /Android/i.test(userAgent);
  const isIPhoneOrIPod = /iPhone|iPod/i.test(userAgent);
  const isIPad = /iPad/i.test(userAgent) || isIPadOS(userAgent);

  // Tablet hints for Android are inconsistent; keep this narrow to avoid misclassifying phones.
  const isAndroidTabletHint = /Android.*(Tablet|Nexus 7|Nexus 9|Nexus 10|SM-T|Lenovo TAB|Xoom)/i.test(
    userAgent
  );

  const isTablet = isIPad || isAndroidTabletHint;
  const isMobilePhone = (isAndroid || isIPhoneOrIPod) && !isTablet;

  return { userAgent, isAndroid, isIOS: isIPhoneOrIPod || isIPad, isTablet, isMobilePhone };
}

const AppBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  // Use useRef to track dismissed state without causing re-renders
  const isDismissedRef = useRef<boolean>(false);
  const hasInitializedRef = useRef<boolean>(false);

  // Initialize and check if banner should show
  useEffect(() => {
    if (!hasInitializedRef.current) {
      const dismissed = localStorage.getItem("app_banner_dismissed");
      const dismissedTime = localStorage.getItem("app_banner_dismissed_time");
      
      // Show again after 7 days
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
      const shouldReshow = dismissedTime && (Date.now() - parseInt(dismissedTime)) > sevenDaysInMs;
      
      isDismissedRef.current = !!dismissed && !shouldReshow;
      hasInitializedRef.current = true;

      const { isMobilePhone } = getMobileContext();

      // Show banner only on mobile phones, not tablets
      if (isMobilePhone && !isDismissedRef.current) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleClose = (): void => {
    setFadeOut(true);
    
    setTimeout(() => {
      localStorage.setItem("app_banner_dismissed", "true");
      localStorage.setItem("app_banner_dismissed_time", Date.now().toString());
      isDismissedRef.current = true;
      setShowBanner(false);
      setFadeOut(false);
    }, 200);
  };

  const handleOpen = (): void => {
    localStorage.setItem("app_banner_dismissed", "true");
    localStorage.setItem("app_banner_dismissed_time", Date.now().toString());
    isDismissedRef.current = true;
  };

  const { isAndroid, isIOS } = getMobileContext();
  
  const appUrl: string | null = isAndroid
    ? "https://play.google.com/store/apps/details?id=com.bonc.axsmapathon"
    : isIOS
    ? "https://apps.apple.com/pk/app/axs-map/id554015666"
    : null;

  if (!showBanner || !appUrl) return null;

  return (
    <>
      {/* Reddit-style bottom sticky bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        padding: '12px 16px',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        animation: fadeOut ? 'slideDown 0.2s ease-out forwards' : 'slideUp 0.3s ease-out',
      }}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{ 
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          aria-label="Close"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#6b7280" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Text */}
        <div style={{
          flex: 1,
          fontSize: '15px',
          fontWeight: '500',
          color: '#1f2937',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          View in AXS Map App
        </div>

        {/* Open Button */}
        <a
          href={appUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleOpen}
          style={{
            backgroundColor: '#FF4500',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '600',
            textDecoration: 'none',
            padding: '10px 24px',
            borderRadius: '24px',
            cursor: 'pointer',
            border: 'none',
            flexShrink: 0,
            display: 'inline-block',
          }}
        >
          Open
        </a>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideUp {
          from { 
            transform: translateY(100%);
          }
          to { 
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from { 
            transform: translateY(0);
          }
          to { 
            transform: translateY(100%);
          }
        }
      `}</style>
    </>
  );
};

export default AppBanner;
