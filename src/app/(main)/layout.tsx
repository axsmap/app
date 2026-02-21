"use client";
import CreateReview from "@/components/addReview/CreateReview";
import { createReviewRef } from "@/components/addReview/interface";
import AppBanner from "@/components/appBanner";
import AppPromoPopup from "@/components/AppPromoPopup";
import FilterModal from "@/components/FilterModal/FilterModal";
import { filterRef } from "@/components/FilterModal/interface";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SurveyModal, { surveyRef } from "@/components/surveyModal/surveyModal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <AppBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CreateReview ref={createReviewRef} />
      <FilterModal ref={filterRef} />
      <SurveyModal ref={surveyRef} />
      <AppPromoPopup />
    </div>
  );
}
