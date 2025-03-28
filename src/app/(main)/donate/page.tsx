import DonorAbout from "@/components/donate/donor-about";
import DonateSection from "@/components/donate/donor-section";
import DonorStats from "@/components/donate/donor-stats";
import React from "react";

export default function Donate() {
  return (
    <div>
      <DonateSection />
      <DonorStats />
      <DonorAbout />
    </div>
  );
}
