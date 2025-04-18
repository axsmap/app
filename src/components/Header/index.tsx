"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "./images/logo.png";
import Link from "next/link";
import InfoCircleIcon from "@/assets/icons/info-circle-icon";
import TranslationIcon from "@/assets/icons/translation-icon";
import { useTranslation } from "react-i18next";
import { showAuthModal } from "../AuthModal/handleAuthModal";
import { useAppSelector } from "@/Store";
import { useLazyGetUserQuery } from "@/Services/modules/users";
import InfoModal from "../InfoModal/info-modal";

const Header = () => {
  const [getUserProfile] = useLazyGetUserQuery();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const token = useAppSelector((state) => state.token.token);
  const [user, setUser] = useState<any>(null);
  const { t, i18n } = useTranslation();

  const handleMenuClick = (menu: string) => setSelectedMenu(menu);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  const handleInfo = () => setIsInfoOpen(true);
  const handleCloseInfo = () => setIsInfoOpen(false);

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await getUserProfile();
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

  console.log("Current language:", i18n.language);

  return (
    <>
      <div className="bg-[#2D2635] p-4 flex justify-between items-center ">
        <div className="flex items-center">
          <Image src={logo} alt={t("headerLogoAlt")} width={212} height={52} />
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
            {t("headerVenues")}
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
            {t("headerMapathons")}
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
            {t("headerTeams")}
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
            {t("headerDonate")}
          </Link>
        </div>

        <div className="relative flex">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full" onClick={handleInfo}>
              <InfoCircleIcon />
            </button>

            <div className="relative">
              <button
                className="p-2 rounded-full"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              >
                <TranslationIcon />
              </button>
              {isLanguageMenuOpen && (
                <div className="absolute right-0 bg-white border rounded-lg mt-2 p-2 w-32">
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className="block w-full text-left py-1"
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange("fr")}
                    className="block w-full text-left py-1"
                  >
                    French
                  </button>
                </div>
              )}
            </div>

            {!user ? (
              <button
                onClick={showAuthModal}
                className="bg-yellow-500 text-white flex items-center justify-center gap-2 px-5 py-3 rounded-lg"
              >
                {t("headerSignIn")}
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
                      alt={t("headerUserAvatarAlt")}
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
                <span className="font-medium">{t("headerMyAccount")}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <InfoModal isOpen={isInfoOpen} onClose={handleCloseInfo} />
    </>
  );
};

export default Header;
