import DonorAbout from "@/components/donor-about";
import DonateSection from "@/components/donor-section";
import DonorStats from "@/components/donor-stats";
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
