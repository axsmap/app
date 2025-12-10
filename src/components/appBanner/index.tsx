import AppLogo from '@/assets/icons/app-logo';
import React, { useEffect, useState, useRef } from 'react';

const AppBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);

  // Use useRef to track dismissed state without causing re-renders
  const isDismissedRef = useRef<boolean>(false);
  const hasInitializedRef = useRef<boolean>(false);

  // Initialize and check if banner should show
  useEffect(() => {
    if (!hasInitializedRef.current) {
      const dismissed = localStorage.getItem("app_banner_dismissed");
      isDismissedRef.current = !!dismissed;
      hasInitializedRef.current = true;

      // Check if mobile device using user agent (most reliable method)
      const userAgent = navigator.userAgent;
      const isMobileDevice = /iPhone|iPod|Android(?!.*Tablet)|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = /iPad|Android.*Tablet|Tablet/i.test(userAgent);

      // Show banner only on mobile phones, not tablets (tablets have better web experience)
      if (isMobileDevice && !isTablet && !isDismissedRef.current) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleClose = (): void => {
    // Update localStorage
    localStorage.setItem("app_banner_dismissed", "true");
    
    // Update ref (won't cause re-render)
    isDismissedRef.current = true;
    
    // Hide banner immediately
    setShowBanner(false);
  };

  const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  
  const appUrl: string | null = isAndroid
    ? "https://play.google.com/store/apps/details?id=com.bonc.axsmapathon"
    : isIOS
    ? "https://apps.apple.com/pk/app/axs-map/id554015666"
    : null;

  if (!showBanner || !appUrl) return null;

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '12px',
      padding: '12px 16px',
      margin: '16px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Close Button */}
      <button
        onClick={handleClose}
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#6c757d', 
          fontSize: '18px',
          padding: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Close banner"
      >
        ×
      </button>

      {/* App Icon */}
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        // backgroundColor: '#007aff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}><AppLogo className="lg:w-[150px] lg:h-[45px] w-[80px] h-[20px]" />
        {/* <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            border: '2px solid white'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: 'white'
          }} />
        </div> */}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#212529',
          marginBottom: '2px',
          lineHeight: '1.2'
        }}>
          AXSMAP App
        </div>
        <div style={{
          fontSize: '14px',
          color: '#6c757d',
          marginBottom: '2px',
          lineHeight: '1.2'
        }}>
          Find accessible places, map inclusion.
        </div>
        <div style={{
          fontSize: '12px',
          color: '#6c757d',
          lineHeight: '1.2'
        }}>
          FREE • {isIOS ? 'On the App Store' : 'On Google Play'}
        </div>
      </div>

      {/* View Button */}
      <a
        href={appUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: '#007aff',
          fontSize: '16px',
          fontWeight: '600',
          textDecoration: 'none',
          padding: '8px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
          flexShrink: 0
        }}
      >
        VIEW
      </a>
    </div>
  );
};

export default AppBanner;
