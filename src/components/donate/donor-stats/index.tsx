import DonorStatsArmsIcon from "@/assets/icons/donor-stats-arms-icon";
import DonorStatsGlobalIcon from "@/assets/icons/donor-stats-global";
import DonorStatsWheelIcon from "@/assets/icons/donor-stats-wheel-icon";
import React from "react";
import { useTranslation } from "react-i18next";

const DonorStats = () => {
  const { t } = useTranslation();

  const donorStatsData = [
    {
      id: 1,
      value: "25K+",
      label: t("statsRegisteredUsers"),
      icon: <DonorStatsWheelIcon />,
    },
    {
      id: 2,
      value: "500+",
      label: t("statsMapathonsCities"),
      icon: <DonorStatsArmsIcon />,
    },
    {
      id: 3,
      value: "150+",
      label: t("statsCountries"),
      icon: <DonorStatsGlobalIcon />,
    },
  ];

  return (
    <div
      className="relative bg-cover bg-center mx-auto px-6 py-8 sm:px-6 lg:px-8 w-full"
      style={{
        maxWidth: "1300px",
        backgroundImage: "url('/donor-stats-backgroud.png')",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-center">
        {donorStatsData.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center text-center bg-yellow-500 p-6 rounded-lg shadow-md"
          >
            {stat.icon}
            <p className="mt-3 text-[#363537] text-xl font-bold">
              {stat.value}
            </p>
            <p className="text-[#5A595A] text-md">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorStats;
