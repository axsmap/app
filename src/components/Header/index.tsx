"use client";
import React, { useState, useEffect } from "react";
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
import { changeLanguage } from "@/Store/Language";
import { useDispatch } from "react-redux";
import { Menu, X } from "lucide-react";
import { getLanguageDisplayName } from "@/utils/helperFunction";
import { getUserSuccess } from "@/Store/Auth/userSlice";
import { getTokenSuccess } from "@/Store/Auth/tokenSlice";

const Header = () => {
  const [getUserProfile] = useLazyGetUserQuery();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const token = useAppSelector((state) => state.token.token);
  const storedLanguage = useAppSelector((state) => state.language.language);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    setIsMobileMenuOpen(false); // Close mobile menu on click
  };

  useEffect(() => {
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n, storedLanguage]);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch(changeLanguage(lang));
    setIsLanguageMenuOpen(false);
  };

  const handleInfo = () => setIsInfoOpen(true);
  const handleCloseInfo = () => setIsInfoOpen(false);
  useEffect(() => {
    if (!token) return;
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile().unwrap();
        dispatch(getTokenSuccess(token));
        dispatch(getUserSuccess(res));
      } catch {}
    };
    fetchProfile();
  }, [token]);

  return (
    <>
      <div className="bg-[#2D2635] p-4 flex justify-between items-center relative">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={logo}
              alt={t("headerLogoAlt")}
              width={180}
              height={45}
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {["Venues", "Mapathons", "Teams", "Donate"].map((item) => (
            <Link
              key={item}
              href={item === "Venues" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => handleMenuClick(item)}
              className={`flex items-center gap-2.5 px-4 py-2 ${
                selectedMenu === item ||
                (item === "Venues" && selectedMenu === null)
                  ? "border-b-2 border-[#FDDF00] text-[#FDDF00] font-bold text-lg"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              {t(`header${item}`)}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2" onClick={handleInfo}>
            <InfoCircleIcon />
          </button>

          <div className="relative">
            <button
              className="p-2"
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            >
              <TranslationIcon />
            </button>

            {isLanguageMenuOpen && (
              <div className="absolute right-0 bg-white border rounded-lg mt-2 p-2 w-32 z-10">
                {["en", "fr", "es", "jp"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className="block w-full text-left py-1"
                  >
                    {getLanguageDisplayName(lang)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!user ? (
            <button
              onClick={showAuthModal}
              className="bg-yellow-500 text-white px-5 py-3 rounded-lg font-medium"
            >
              {t("headerSignIn")}
            </button>
          ) : (
            <div>
              <Link
                href="/my-account"
                className="flex items-center gap-2 text-white"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300">
                  {user?.avatar ? (
                    <Image
                      src={user?.avatar}
                      alt={t("headerUserAvatarAlt")}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm font-medium text-gray-700 bg-gray-100">
                      {user.firstName}
                    </div>
                  )}
                </div>
                <span className="font-medium">{t("headerMyAccount")}</span>
              </Link>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="text-white" size={28} />
            ) : (
              <Menu className="text-white" size={28} />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#2D2635] flex flex-col items-start p-4 space-y-4 md:hidden z-20">
            {["Venues", "Mapathons", "Teams", "Donate"].map((item) => (
              <Link
                key={item}
                href={item === "Venues" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => handleMenuClick(item)}
                className="text-white w-full text-left py-2"
              >
                {t(`header${item}`)}
              </Link>
            ))}

            <div className="flex items-center space-x-4">
              <button onClick={handleInfo}>
                <InfoCircleIcon />
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                >
                  <TranslationIcon />
                </button>

                {isLanguageMenuOpen && (
                  <div className="absolute left-0 bg-white border rounded-lg mt-2 p-2 w-32 z-10">
                    {["en", "fr", "es", "jp"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className="block w-full text-left py-1"
                      >
                        {getLanguageDisplayName(lang)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {!user ? (
              <button
                onClick={showAuthModal}
                className="bg-yellow-500 text-white w-full py-3 rounded-lg font-medium"
              >
                {t("headerSignIn")}
              </button>
            ) : (
              <Link
                href="/my-account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-white w-full py-2"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-300">
                  {user?.avatar ? (
                    <Image
                      src={user?.avatar}
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
        )}
      </div>

      <InfoModal isOpen={isInfoOpen} onClose={handleCloseInfo} />
    </>
  );
};

export default Header;
