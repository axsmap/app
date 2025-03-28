"use client";
import React, { useState } from "react";

const DonateSection = () => {
  const [amount, setAmount] = useState<number | string>("");

  const handleAmountChange = (value: string) => {
    setAmount(value);
  };
  return (
    <div
      className="relative bg-cover bg-center py-16 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('/donate-background.png')",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex-1 flex flex-col items-start p-[32px] gap-[16px] rounded-[16px] bg-[#FFFCE6]">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-4">
            Open more doors for more people
          </h1>
          <p className="text-lg text-gray-600">
            By donating, you're enabling AXS Lab to do the work we do best —
            bringing people together and creating a world for everyone.
            Donations mean growing accessibility freedom for all, and helping
            real people — millions of them — in very real ways.
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-[24px] py-[24px] gap-[16px] rounded-[16px] bg-white shadow-md">
          <div className="flex justify-center gap-4">
            <button className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-700">
              Donate Once
            </button>
            <button className="bg-yellow-400 text-black py-2 px-6 rounded-lg hover:bg-yellow-500">
              Donate Monthly
            </button>
          </div>

          <div className="text-center">
            <p className="text-xl font-semibold text-gray-800 mb-4">
              Choose an amount to donate
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleAmountChange("$25")}
                className={`py-2 px-6 rounded-lg ${
                  amount === "$25"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                $25
              </button>
              <button
                onClick={() => handleAmountChange("$50")}
                className={`py-2 px-6 rounded-lg ${
                  amount === "$50"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                $50
              </button>
              <button
                onClick={() => handleAmountChange("$100")}
                className={`py-2 px-6 rounded-lg ${
                  amount === "$100"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                $100
              </button>
            </div>
            {amount && (
              <div className="flex justify-center items-center flex-col w-full mt-4">
                <button className="flex  w-[150px] h-[50px] px-[18px] py-[12px] justify-center items-center gap-[6px] rounded-[12px] bg-[#FEE633]">
                  Donate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateSection;
