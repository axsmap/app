import DonorStatsArmsIcon from "@/assets/icons/donor-stats-arms-icon";
import DonorStatsGlobalIcon from "@/assets/icons/donor-stats-global";
import DonorStatsWheelIcon from "@/assets/icons/donor-stats-wheel-icon";
import React from "react";

const donorStatsData = [
  {
    id: 1,
    value: "12K+",
    label: "Registered Users",
    icon: <DonorStatsWheelIcon />,
  },
  {
    id: 2,
    value: "300k+",
    label: "Mapathons in Major Cities",
    icon: <DonorStatsArmsIcon />,
  },
  {
    id: 3,
    value: "100+",
    label: "Countries Around the World",
    icon: <DonorStatsGlobalIcon />,
  },
];

const DonorStats = () => {
  return (
    <div
      className="relative bg-cover bg-center ml-10 py-4 px-4 sm:px-6 lg:px-8"
      style={{
        width: "1320px",
        padding: "64px",
        backgroundImage: "url('/donor-stats-backgroud.png')",
      }}
    >
      <div className="flex justify-center items-center gap-10">
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
