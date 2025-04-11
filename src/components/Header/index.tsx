"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "./images/logo.png";
import Link from "next/link";
import InfoCircleIcon from "@/assets/icons/info-circle-icon";
import TranslationIcon from "@/assets/icons/translation-icon";
import { useLazyGetUserQuery } from "@/app/Services/modules/users";
import { showAuthModal } from "../AuthModal/handleAuthModal";
import { useAppSelector } from "@/app/Store";

const Header = () => {
  const [getUserProfile] = useLazyGetUserQuery();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const token = useAppSelector((state) => state.token.token);
  const [user, setUser] = useState<any>(null);
  console.log({ user });

  const handleMenuClick = (menu: string) => setSelectedMenu(menu);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await getUserProfile();
        console.log(res);
        setUser(res);
      } catch {
        // Handle error if needed
      }
    };

    if (token) {
      getProfile();
    } else {
      setUser(null);
    }
  }, [token, getUserProfile]);

  return (
    <>
      <div className="bg-[#2D2635] p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src={logo} alt="AXS Map Logo" width={212} height={52} />
        </div>

        <div className="flex items-center space-x-6">
          <Link
            href="/"
            onClick={() => handleMenuClick("Venues")}
            className={`flex items-center text-white gap-2.5 px-4 py-2 
              ${
                selectedMenu === "Venues" || selectedMenu === null
                  ? "border-b-2 border-[#FDDF00] text-[#363537] font-bold text-lg"
                  : "text-gray-900"
              }`}
          >
            Venues
          </Link>

          <Link
            href="/mapathons"
            onClick={() => handleMenuClick("Mapathons")}
            className={`flex items-center text-white gap-2.5 px-4 py-2 
              ${
                selectedMenu === "Mapathons"
                  ? "border-b-2 border-[#FDDF00] text-[#363537] font-bold text-lg"
                  : "text-gray-900"
              }`}
          >
            AXS Mapathons
          </Link>

          <Link
            href="/teams"
            onClick={() => handleMenuClick("Teams")}
            className={`flex items-center text-white gap-2.5 px-4 py-2 
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
            className={`flex items-center text-white gap-2.5 px-4 py-2 
              ${
                selectedMenu === "Donate"
                  ? "border-b-2 border-[#FDDF00] text-[#363537] font-bold text-lg"
                  : "text-gray-900"
              }`}
          >
            Donate
          </Link>
        </div>

        <div className="relative flex">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full">
              <InfoCircleIcon />
            </button>
            <button className="p-2 rounded-full">
              <TranslationIcon />
            </button>

            {!user ? (
              <button
                onClick={showAuthModal}
                className="bg-yellow-500 text-white flex items-center justify-center gap-2 px-5 py-3 rounded-lg"
              >
                Sign In
              </button>
            ) : (
              <Link
                href="/my-account"
                className="flex items-center gap-2 text-white"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300">
                  {user?.data?.avatar ? (
                    <Image
                      src={user?.data?.avatar}
                      alt="User Avatar"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm font-medium text-gray-700 bg-gray-100">
                      {user.firstName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="font-medium">My Account</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
