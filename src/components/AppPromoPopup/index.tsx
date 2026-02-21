"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/utils/constants";
import { event as trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "app_promo_dismissed_at";
const SUPPRESS_DAYS = 30;
const SUPPRESS_MS = SUPPRESS_DAYS * 24 * 60 * 60 * 1000;

function getDeviceType(): "mobile" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  return /Android|iPhone|iPod|iPad/i.test(navigator.userAgent)
    ? "mobile"
    : "desktop";
}

function isSuppressed(): boolean {
  if (typeof window === "undefined") return true;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  const ts = parseInt(raw, 10);
  return Date.now() - ts < SUPPRESS_MS;
}

function suppress(): void {
  localStorage.setItem(STORAGE_KEY, Date.now().toString());
}

function wasPreviouslyDismissed(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(STORAGE_KEY);
}

const AppPromoPopup: React.FC = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const deviceType = useRef(getDeviceType());

  // Track analytics
  const track = useCallback(
    (action: string) => {
      trackEvent({
        action,
        category: "app_promo",
        label: JSON.stringify({
          page: pathname,
          device: deviceType.current,
          referrer: typeof document !== "undefined" ? document.referrer : "",
          previouslyDismissed: wasPreviouslyDismissed(),
        }),
      });
    },
    [pathname]
  );

  // Show popup on mount if not suppressed
  useEffect(() => {
    if (isSuppressed()) return;
    // Small delay so we don't block initial paint
    const timer = setTimeout(() => {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Fire shown event when visible
  useEffect(() => {
    if (visible) {
      track("app_popup_shown");
    }
  }, [visible, track]);

  // Focus trap + ESC handling
  useEffect(() => {
    if (!visible) return;

    // Focus the dialog
    dialogRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
        return;
      }
      // Focus trap
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll on mobile
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleDismiss = useCallback(() => {
    suppress();
    track("app_popup_dismissed");
    setVisible(false);
    previousFocusRef.current?.focus();
  }, [track]);

  const handleStoreClick = useCallback(
    (store: "appstore" | "playstore") => {
      suppress();
      track(
        store === "appstore"
          ? "app_popup_appstore_clicked"
          : "app_popup_playstore_clicked"
      );
      // Keep popup open briefly — link opens in new tab
      setTimeout(() => {
        setVisible(false);
        previousFocusRef.current?.focus();
      }, 300);
    },
    [track]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) {
        handleDismiss();
      }
    },
    [handleDismiss]
  );

  if (!visible) return null;

  const isMobile = deviceType.current === "mobile";

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[10000] flex ${
        isMobile ? "items-end" : "items-center"
      } justify-center bg-black/50 backdrop-blur-sm`}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("appPromo.title")}
        tabIndex={-1}
        className={`
          relative bg-white shadow-2xl outline-none
          ${
            isMobile
              ? "w-full rounded-t-2xl animate-slide-up pb-[env(safe-area-inset-bottom)]"
              : "w-full max-w-[480px] rounded-2xl animate-fade-in"
          }
        `}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={t("appPromo.close")}
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
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Content */}
        <div className="px-6 pt-8 pb-6 text-center">
          {/* App icon */}
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-md">
            <img
              src="/axs-map-v6.svg"
              alt="AXS Map"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t("appPromo.title")}
          </h2>
          <p className="text-sm text-gray-600 mb-6 max-w-[320px] mx-auto">
            {t("appPromo.body")}
          </p>

          {/* Store buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleStoreClick("appstore")}
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              {t("appPromo.appStore")}
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleStoreClick("playstore")}
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.396 12l2.302-3.192zM5.864 2.658L16.8 8.99l-2.302 2.302L5.864 2.658z" />
              </svg>
              {t("appPromo.googlePlay")}
            </a>
          </div>

          {/* Not now link */}
          <button
            onClick={handleDismiss}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {t("appPromo.notNow")}
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AppPromoPopup;
