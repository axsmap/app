"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/components/context/auth-context";
import { store } from "@/Store";
import i18n from "@/translation";
import React from "react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import Toast, { toastRef } from "@/components/toast";
import ToastProvider from "@/components/context/toast-context";
import AppBanner from "@/components/appBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Open Graph site name - critical for social sharing */}
        <meta property="og:site_name" content="AXS Map" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        
        {/* Default OG tags - will be overridden by page-specific metadata */}
        <meta property="og:title" content="AXS Map" />
        <meta
          property="og:description"
          content="Discover and review accessible places with AXS Map."
        />
        <meta
          property="og:image"
          content="https://axsmap.com/axs-map.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@axsmap" />
        <meta name="twitter:title" content="AXS Map" />
        <meta
          name="twitter:description"
          content="Discover and review accessible places with AXS Map."
        />
        <meta
          name="twitter:image"
          content="https://axsmap.com/axs-map.jpg"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ToastProvider>
              <AppBanner />
              <AuthProvider>{children}</AuthProvider>
              <Toast ref={toastRef} />
            </ToastProvider>
          </I18nextProvider>
        </Provider>
      </body>
    </html>
  );
}
