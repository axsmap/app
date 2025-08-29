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
import Head from "next/head";

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
      <Head>
        {/* Standard Meta */}
        <title>AXS Map</title>
        <meta
          name="description"
          content="Discover and review accessible places with AXS Map."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="AXS Map" />
        <meta
          property="og:description"
          content="Discover and review accessible places with AXS Map."
        />
        <meta
          property="og:image"
          content="https://axsmap-media.s3.us-east-1.amazonaws.com/photos/20992132_1739358679700112_7215955896671666176_n.png"
        />
        <meta
          property="og:url"
          content="https://next-application.d3fpng0qhp544j.amplifyapp.com/"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AXS Map" />
        <meta
          name="twitter:description"
          content="Discover and review accessible places with AXS Map."
        />
        <meta
          name="twitter:image"
          content="https://axsmap-media.s3.us-east-1.amazonaws.com/photos/20992132_1739358679700112_7215955896671666176_n.png"
        />
      </Head>
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
