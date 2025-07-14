"use client";
import InfoCircleIcon from "@/assets/icons/info-circle-icon";
import { useLazyGetUserQuery } from "@/Services/modules/users";
import { useAppSelector } from "@/Store";
import { getUserSuccess } from "@/Store/Auth/userSlice";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";
import { HiHeart, HiHome, HiMap, HiUserGroup } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { showAuthModal } from "../AuthModal/handleAuthModal";
import InfoModal from "../InfoModal/info-modal";
// import logo from "./images/logo.png";
import BlackLogo from "@/assets/icons/black-logo";
import { FilterIcon } from "@/assets/icons/filter-icon";
import SearchIcon from "@/assets/icons/search-icon";
import { setSearch } from "@/Store/Search/searchSlice";
import { showFilterModal } from "../FilterModal/interface";
import { useRouter } from "next/navigation";

const Translator = memo(() => {
  function googleTranslateElementInit() {
    if (!window.google || !window.google.translate) return;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
      },
      "google_translate_element"
    );
  }

  function onLangChange() {
    const selectEl = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (selectEl) {
      const selectedLang = selectEl.options[selectEl.selectedIndex].text;
    }
  }

  useEffect(() => {
    const alreadyExists = document?.querySelector(".goog-te-combo");
    if (alreadyExists) return;
    var addScript = document.createElement("script");

    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    addScript.setAttribute("defer", "true");
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
    const interval = setInterval(() => {
      const selectEl = document?.querySelector(".goog-te-combo");
      if (selectEl) {
        selectEl.addEventListener("change", onLangChange);
        clearInterval(interval); // remove interval once found
      }
    }, 500);
    document
      ?.getElementById("google_translate_element")
      ?.addEventListener("change", onLangChange, false);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div id="google_translate_element"></div>;
});

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const Header = () => {
  const [getUserProfile] = useLazyGetUserQuery();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const token = useAppSelector((state) => state.token.token);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);
  const search = useAppSelector((state) => state.search.search);
  const storedLanguage = useAppSelector((state) => state.language.language);
  const router = useRouter()

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  useEffect(() => {
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n, storedLanguage]);

  const handleInfo = () => setIsInfoOpen(true);
  const handleCloseInfo = () => setIsInfoOpen(false);

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
    { href: "/", label: t("headerVenues"), id: "Venues", icon: HiHome },
    { href: "/mapathons", label: "Mapathons", id: "Mapathons", icon: HiMap },
    { href: "/teams", label: t("headerTeams"), id: "Teams", icon: HiUserGroup },
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
            <div className="hidden rounded-lg px-4 gap-x-2 py-2 md:flex justify-between items-center border border-gray-300 w-full">
              <SearchIcon className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by category & address (coffee, New York)"
                className="md:text-base w-full text-sm focus:outline-none shadow-none"
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
              />
              <button
                className=" text-gray-400"
                onClick={() => showFilterModal()}
              >
                <FilterIcon />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="flex">
            <div className="hidden lg:flex items-center space-x-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => handleMenuClick(link.id)}
                  className={`flex items-center text-gray-900 py-2 
                  ${
                    selectedMenu === link.id ||
                    (link.id === "Venues" && selectedMenu === null)
                      ? "border-b-2 border-[#FDDF00] text-[#000] font-bold text-lg"
                      : "text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4 justify-end">
              <button className="p-2 rounded-full" onClick={handleInfo}>
                <InfoCircleIcon  />
              </button>

              <Translator />

              {!user ? (
                <button
                  onClick={showAuthModal}
                  className="hidden text-[12px] text-wrap lg:flex bg-yellow-500 text-white items-center justify-center gap-2 px-5 py-3 rounded-lg"
                >
                  {"Sign in/Sign up"}
                </button>
              ) : (
                <Link
                  href="/my-account"
                  className="hidden md:flex items-center gap-2 text-white"
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
              onClick={() => handleMenuClick(link.id)}
              className={`flex flex-col items-center text-white `}
            >
              <link.icon className={`md:h-6 md:w-6 h-4 w-4 mb-1 ${
                selectedMenu === link.id ||
                (link.id === "Venues" && selectedMenu === null)
                  ? "text-[#FDDF00]"
                  : ""
              }`} />
              <span className={`md:text-xs text-[10px] ${
                selectedMenu === link.id ||
                (link.id === "Venues" && selectedMenu === null)
                  ? "text-[#FDDF00]"
                  : ""
              }`}>{link.label}</span>
            </Link>
          ))}
          <div
            // href={link.href}
            onClick={
              () => (!user ? showAuthModal() :router.push("/my-account") ) // 
            }
            className={`flex flex-col items-center text-white`}
          >
            {user?.avatar ? (
              <img src={user?.avatar} className="md:h-6 md:w-6 h-4 w-4 mb-1" />
            ) : (
              <FaUser className="md:h-6 md:w-6 h-4 w-4 mb-1" />
            )}
            <span className="md:text-xs text-[10px]">
              {user
                ? `${user?.firstName} ${user?.lastName}`
                    .slice(0, 8)
                    .padEnd(12, "...")
                : "sign in/sign up"}
            </span>
          </div>
        </div>
      </div>

      <InfoModal isOpen={isInfoOpen} onClose={handleCloseInfo} />
    </div>
  );
};

export default Header;
