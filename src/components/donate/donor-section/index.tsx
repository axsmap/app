"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const once = [
  {
    value:
      "https://www.paypal.com/donate/?cmd=_donations&business=info@axslab.org&item_name=Single+Donation&item_number=AXS+Map&&amount=4.99&currency_code=USD",
    title: "$4.99",
  },
  {
    value:
      "https://www.paypal.com/donate/?cmd=_donations&business=info@axslab.org&item_name=Single+Donation&item_number=AXS+Map&&amount=14.99&currency_code=USD",
    title: "$14.99",
  },
  {
    value:
      "https://www.paypal.com/donate/?cmd=_donations&business=info@axslab.org&item_name=Single+Donation&item_number=AXS+Map&&amount=24.99&currency_code=USD",
    title: "$24.99",
  },
  { value: "https://www.paypal.com/paypalme/axslab", title: "Other" },
];

const monthly = [
  {
    value:
      "https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=V2QSLD9KYLZ4C&source=url&ssrt=1753686155523",
    title: "$4.99",
  },
  {
    value:
      "https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=N2HQG66RQGHFU&source=url&ssrt=1753686169821",
    title: "$14.99",
  },
  {
    value:
      "https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=JTFTPWCEPDK5Q&source=url&ssrt=1753686181784",
    title: "$24.99",
  },
  {
    value:
      "https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=PR6B6HVBG3EL2&source=url&ssrt=1753686193610",
    title: "Other",
  },
];

const DonateSection = () => {
  const { t } = useTranslation();
  const [donationType, setDonationType] = useState<
    "donateOnce" | "donateMonthly"
  >("donateOnce");

  const handleDonationTypeChange = (type: "donateOnce" | "donateMonthly") => {};

  const handleDonateClick = (url: string) => {
     window.open(url, '_blank');
    // let donationUrl = "";
    // if (donationType === "donateOnce") {
    //   if (amount === "other") {
    //     donationUrl = "https://www.paypal.com/paypalme/axslab";
    //   } else {
    //     donationUrl = `https://www.paypal.com/donate/?cmd=_donations&business=info@axslab.org&item_name=Single+Donation&item_number=AXS+Map&&amount=${amount}&currency_code=USD`;
    //   }
    // } else if (donationType === "donateMonthly") {
    //   if (amount === "other") {
    //     donationUrl =
    //       "https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=PR6B6HVBG3EL2&source=url&ssrt=1744182083269";
    //   } else {
    //     donationUrl =
    //       "https://www.paypal.com/donate/?cmd=_s-xclick&hosted_button_id=JTFTPWCEPDK5Q&source=url&ssrt=1744116510740";
    //   }
    // }
  };

  return (
    <div
      className="relative bg-cover bg-center py-16 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('/donate-background.png')",
      }}
    >
      <div className=" mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex-1 flex flex-col items-center justify-center px-[24px] py-[24px] gap-[16px] rounded-[16px] bg-white shadow-md">
          <div className="flex-1 flex flex-col items-start p-[32px] gap-[16px] rounded-[16px] bg-[#FFFCE6]">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight mb-4">
              {t("donationTitle")}
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              {t("description")}
            </p>
          </div>
          <div className="flex flex-col mt-3 sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                setDonationType("donateOnce");
              }}
              className={`py-2 px-6 rounded-lg text-lg ${
                donationType === "donateOnce"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {t("donateOnce")}
            </button>
            <button
              onClick={() => {
                setDonationType("donateMonthly");
              }}
              className={`py-2 px-6 rounded-lg ${
                donationType === "donateMonthly"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {t("donateMonthly")}
            </button>
          </div>
          <p className="text-xl mt-5 font-semibold text-gray-800 mb-4">
            {t("chooseAmount")}
          </p>
          <div className="flex gap-x-5">
            {(donationType === "donateMonthly" ? monthly : once).map(
              (item, index) => (
                <div
                  key={index}
                  onClick={() => handleDonateClick(item?.value)}
                  className={`h-32 w-32 flex items-center justify-center  rounded-full ${"bg-gray-200"}`}
                >
                  <p className="text-xl font-semibold text-gray-800">
                    {item?.title}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateSection;
