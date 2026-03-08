"use client";
import { useLazyGetUserQuery } from "@/Services/modules/users";
import { useAppSelector } from "@/Store";
import { clearUser, getUserSuccess } from "@/Store/Auth/userSlice";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";
import { HiHeart, HiHome, HiMap, HiUserGroup, HiQuestionMarkCircle, HiInformationCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { showAuthModal } from "../AuthModal/handleAuthModal";
// import logo from "./images/logo.png";
import BlackLogo from "@/assets/icons/black-logo";
import { FilterIcon } from "@/assets/icons/filter-icon";
import SearchIcon from "@/assets/icons/search-icon";
import { setSearch } from "@/Store/Search/searchSlice";
import { showFilterModal } from "../FilterModal/interface";
import { useRouter } from "next/navigation";
import { LogOutIcon, UserIcon, X } from "lucide-react";
import { showServeyModal } from "../surveyModal/surveyModal";
import Cookies from "js-cookie";
import { clearToken } from "@/Store/Auth/tokenSlice";
import { usePathname } from "next/navigation";
import { changeLanguage } from "@/Store/Language";

const Translator = memo(() => {
  const LANGS = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "it", label: "Italiano" },
    { value: "pt", label: "Português" },
    { value: "zh-CN", label: "中文 (简体)" },
    { value: "jp", label: "日本語" },
    { value: "ko", label: "한국어" },
    { value: "ar", label: "العربية" },
    { value: "ru", label: "Русский" },
    { value: "hi", label: "हिन्दी" },
  ] as const;

  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const storedLanguage = useAppSelector((state) => state.language.language);

  // Current language — prefer stored, fall back to i18n, then "en"
  const currentLang = storedLanguage || i18n.language || "en";

  const handleLanguageChange = (lang: string) => {
    // 1. Update i18next (immediately re-renders all t() calls)
    i18n.changeLanguage(lang);

    // 2. Persist in Redux (which is persisted to storage via redux-persist)
    dispatch(changeLanguage(lang));

    // 3. Also store in localStorage as a fallback for the i18n init module
    if (typeof window !== "undefined") {
      localStorage.setItem("i18nextLng", lang);
    }
  };

  return (
    <div className="relative">
      <select
        aria-label="Select language"
        className="bg-transparent border border-gray-300 rounded-md px-2 py-1 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
        value={currentLang}
        onChange={(e) => handleLanguageChange(e.target.value)}
      >
        {LANGS.map((l) => (
          <option key={l.value} value={l.value}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
});

const Header = () => {
  const [getUserProfile] = useLazyGetUserQuery();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = useAppSelector((state) => state.token.token);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);
  const search = useAppSelector((state) => state.search.search);
  const storedLanguage = useAppSelector((state) => state.language.language);
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n, storedLanguage]);

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await getUserProfile();
        dispatch(getUserSuccess(res?.data));
      } catch {
        // Handle error if needed
      }
    };

    if (token) {
      getProfile();
    } else {
      dispatch(getUserSuccess(null));
    }
  }, [token, getUserProfile]);

  const navigationLinks = [
    { href: "/", label: t("headerPlaces"), id: "Places", icon: HiHome },
    { href: "/mapathons", label: "Mapathons", id: "Mapathons", icon: HiMap },
    { href: "/teams", label: t("headerTeams"), id: "Teams", icon: HiUserGroup },
    { href: "/about-us", label: t("headerAboutUs"), id: "About Us", icon: HiInformationCircle },
    { href: "/faq", label: t("faq"), id: "FAQ", icon: HiQuestionMarkCircle },
    { href: "/donate", label: t("headerDonate"), id: "Donate", icon: HiHeart },
  ];

  return (
    <div className="w-full">
      <div className="bg-white p-4 border-b-[1px] border-gray-400">
        <div className="w-auto mx-auto flex justify-between items-center">
          <div className="flex items-center gap-x-6 w-[45%] pr-6">
            <Link href="/">
              <BlackLogo className="lg:w-[150px] lg:h-[45px] w-[80px] h-[20px]" />
              {/* <Image
                src={logo}
                alt={t("headerLogoAlt")}
                width={150}
                height={40}
                className="lg:w-[212px] lg:h-[52px] md:w-[112px] md:h-[32px] w-[80px] h-[20px]"
              /> */}
            </Link>
            {pathname === "/" && (
              <div className="hidden rounded-lg px-4 gap-x-2 py-2 md:flex justify-between items-center border border-gray-300 w-full">
                <SearchIcon className="text-gray-400" />

                <input
                  type="text"
                  placeholder="Search by category & address (coffee, New York)"
                  className="md:text-base w-full text-sm focus:outline-none shadow-none"
                  value={search}
                  onChange={(e) => dispatch(setSearch(e.target.value))}
                />

                {search && (
                  <button
                    className="text-gray-400 hover:text-gray-600 "
                    onClick={() => dispatch(setSearch(""))}
                    title="Clear search"
                  >
                    <X size={20} />
                  </button>
                )}

                <button
                  className=" text-gray-400"
                  onClick={() => showFilterModal()}
                >
                  <FilterIcon />
                </button>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="flex">
            <div className="hidden lg:flex items-center space-x-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`flex items-center text-gray-900 py-2 
                  ${
                    isActive(link.href)
                      ? "border-b-2 border-[#FDDF00] text-[#000] font-bold text-lg"
                      : "text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4 justify-end">
              <Translator />

              {!user ? (
                <button
                  onClick={showAuthModal}
                  className="hidden text-[12px] text-wrap lg:flex bg-yellow-500 text-white items-center justify-center gap-2 px-5 py-3 rounded-lg"
                >
                  {"Sign in/Sign up"}
                </button>
              ) : (
                <div className="hidden md:flex items-center gap-2 text-white">
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
                        My Profile
                      </div>
                    )}
                  </div>
                  {user && (
                    <div className="relative">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="font-medium text-black cursor-pointer flex items-center gap-2"
                      >
                        {`${user?.firstName} ${user?.lastName}`}
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <style jsx>{`
                        button + div {
                          z-index: 9999;
                        }
                      `}</style>
                      {isDropdownOpen && (
                        <div
                          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                          onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            href="/my-account"
                            className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <UserIcon className="pr-1" /> My Profile
                          </Link>
                          <button
                            onClick={() => {
                              showServeyModal();
                            }}
                            className="w-full space-x-2 inline-flex items-center text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="pr-1"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                              <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />
                              <path d="M8 10h8" />
                              <path d="M8 14h8" />
                              <path d="M8 18h8" />
                            </svg>
                            How are we doing?
                          </button>
                          <button
                            onClick={() => {
                              Cookies.remove("token");
                              Cookies.remove("refreshToken");
                              dispatch(clearToken());
                              dispatch(clearUser());
                              router.push("/");
                              setIsDropdownOpen(false);
                            }}
                            className="w-full space-x-2 inline-flex items-center text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <LogOutIcon className="pr-1" /> Sign Out
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* <div className="relative group">
                    <span className="font-medium text-black cursor-pointer">{'My Profile'}</span>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                      <Link href="/my-account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Profile
                      </Link>
                      <button 
                        onClick={() => {
                          // Add your logout logic here
                          dispatch(getUserSuccess(null));
                        }} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile/Tablet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#2D2635] z-50">
        <div className="flex justify-around items-center p-4">
          {navigationLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`flex flex-col items-center text-white `}
            >
              <link.icon
                className={`md:h-6 md:w-6 h-4 w-4 mb-1 ${
                  isActive(link.href)
                    ? "text-[#FDDF00]"
                    : ""
                }`}
              />
              <span
                className={`md:text-xs text-[10px] ${
                  isActive(link.href)
                    ? "text-[#FDDF00]"
                    : ""
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <div
            // href={link.href}
            onClick={
              () => (!user ? showAuthModal() : router.push("/my-account")) //
            }
            className={`flex flex-col items-center text-white`}
          >
            {user?.avatar ? (
              <img src={user?.avatar} className="md:h-6 md:w-6 h-4 w-4 mb-1" />
            ) : (
              <FaUser className="md:h-6 md:w-6 h-4 w-4 mb-1" />
            )}
            <div className="md:text-xs text-[10px] text-black">
              {user?.firstName ? "My Profile" : "sign in/sign up"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
