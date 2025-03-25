"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "./images/logo.png";
import info from "./images/info.png";
import translation from "./images/translation.png";
import Link from "next/link";

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <div className="bg-[#2D2635] p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src={logo} alt="AXS Map Logo" width={212} height={52} />
        </div>

        <div className="relative flex items-center w-full max-w-lg">
          <input
            type="text"
            placeholder="Search by category & address (coffee, New York)"
            className="w-full flex px-5 py-4 items-center gap-2.5 self-stretch rounded-[12px] border border-[#DEDEDE] bg-white"
          />
        </div>
      </div>

      <div className="flex h-[80px] px-[60px] justify-between items-center bg-white">
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            onClick={() => handleMenuClick("Venues")}
            className={`flex items-center gap-2.5 px-4 py-2 
              ${
                selectedMenu === "Venues"
                  ? "border-b-2 border-[#FDDF00] text-[#363537] font-bold text-lg"
                  : "text-gray-900"
              }`}
          >
            Venues
          </Link>

          <Link
            href="/mapathons"
            onClick={() => handleMenuClick("AXS Mapathons")}
            className="flex items-center gap-2.5 px-4 py-2"
          >
            AXS Mapathons
          </Link>

          <Link
            href="/teams"
            onClick={() => handleMenuClick("Teams")}
            className={`flex items-center gap-2.5 px-4 py-2 
              ${
                selectedMenu === "Teams"
                  ? "border-b-2 border-[#FDDF00] text-[#363537] font-bold text-lg"
                  : "text-gray-900"
              }`}
          >
            Teams
          </Link>

          <Link
            href="/donate"
            onClick={() => handleMenuClick("Donate")}
            className={`flex items-center gap-2.5 px-4 py-2 
              ${
                selectedMenu === "Donate"
                  ? "border-b-2 border-[#FDDF00] text-[#363537] font-bold text-lg"
                  : "text-gray-900"
              }`}
          >
            Donate
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg[#363537] p-2 rounded-full">
            <Image src={info} alt="info-icon" width={40} height={40} />
          </button>
          <button className="bg[#363537] p-2 rounded-full">
            <Image src={translation} alt="info-icon" width={40} height={40} />
          </button>

          <button className="bg-yellow-500 text-white flex items-center justify-center gap-2 px-5 py-3 rounded-lg">
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
