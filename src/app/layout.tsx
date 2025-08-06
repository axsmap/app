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
