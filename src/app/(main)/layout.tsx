'use client'
import CreateReview from "@/components/addReview/CreateReview";
import { createReviewRef } from "@/components/addReview/interface";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-[100vh] w-[100vw]">
      <Header />
      {children}
      <Footer />
      <CreateReview ref={createReviewRef} />
    </div>
  );
}
