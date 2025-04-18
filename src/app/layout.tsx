"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ClientLayout from "@/components/client-layout/client-layout";
import { AuthProvider } from "@/components/context/auth-context";
import ToastProvider from "@/components/context/toast-context";
import { Provider } from "react-redux";
import { store } from "@/Store";
import { I18nextProvider } from "react-i18next";
import i18n from "@/translation";

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
              <AuthProvider>{children}</AuthProvider>
            </ToastProvider>
          </I18nextProvider>
        </Provider>
      </body>
    </html>
  );
}
