"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect } from "react";
import Script from "next/script";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const OneSignal = window.OneSignal || [];

      OneSignal.push(function () {
        OneSignal.init({
          appId: "1ec2ef9c-0b85-409e-bd30-e4b9e43457e9",
        });
      });
    }
  }, []);

  return (
    <>
      <Script
        strategy="beforeInteractive"
        src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
      />
      <Header />
      {children}
      <Footer />
    </>
  );
}
