"use client";
import InfoCircleIcon from "@/assets/icons/info-circle-icon";
import { useLazyGetUserQuery } from "@/Services/modules/users";
import { useAppSelector } from "@/Store";
import { clearUser, getUserSuccess } from "@/Store/Auth/userSlice";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";
import { HiHeart, HiHome, HiMap, HiUserGroup, HiQuestionMarkCircle } from "react-icons/hi";
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
import { LogOutIcon, UserIcon, X } from "lucide-react";
import { showServeyModal } from "../surveyModal/surveyModal";
import Cookies from "js-cookie";
import { clearToken } from "@/Store/Auth/tokenSlice";
import { usePathname } from "next/navigation";

const Translator = memo(() => {
  const LANGS = [
    { value: "", label: "Language" },
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "it", label: "Italiano" },
    { value: "pt", label: "Português" },
    { value: "zh-CN", label: "中文 (简体)" },
    { value: "ja", label: "日本語" },
    { value: "ko", label: "한국어" },
    { value: "ar", label: "العربية" },
    { value: "ru", label: "Русский" },
    { value: "hi", label: "हिन्दी" },
  ] as const;

  const [ready, setReady] = useState(false);
  const [value, setValue] = useState<string>("");

  // Helper function to read the googtrans cookie
  const getGoogTransCookie = (): string => {
    if (typeof document === "undefined") return "";
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [key, val] = cookie.trim().split("=");
      if (key === "googtrans" && val) {
        // Cookie format: /en/fr (from English to French)
        // Extract the target language (after the second slash)
        const match = val.match(/^\/[^/]+\/(.+)$/);
        if (match && match[1] && match[1] !== "en") {
          return match[1];
        }
      }
    }
    return "";
  };

  // Sync dropdown value with cookie on mount and when cookie changes
  useEffect(() => {
    const syncFromCookie = () => {
      const cookieLang = getGoogTransCookie();
      setValue(cookieLang);
    };

    // Initial sync
    syncFromCookie();

    // Also sync when window gains focus (in case user changed it in another tab)
    window.addEventListener("focus", syncFromCookie);
    
    return () => {
      window.removeEventListener("focus", syncFromCookie);
    };
  }, []);

  function googleTranslateElementInit() {
    if (!window.google || !window.google.translate) return;
    const host = document.getElementById("google_translate_element");
    if (!host) return;

    // Prevent duplicate init
    if (host.getAttribute("data-gt-initialized") === "true") return;
    host.setAttribute("data-gt-initialized", "true");

    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,es,fr,de,it,pt,zh-CN,ja,ko,ar,ru,hi",
        // We render our own dropdown. This is only to create the underlying goog-te-combo.
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );

    // Wait for Google to inject the combo inside our (offscreen) host,
    // then hide *that injected combo* and mark ready.
    const start = Date.now();
    const timer = window.setInterval(() => {
      const hostEl = document.getElementById("google_translate_element");
      const injectedCombo = hostEl?.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (injectedCombo) {
        injectedCombo.style.position = "absolute";
        injectedCombo.style.opacity = "0";
        injectedCombo.style.pointerEvents = "none";
        injectedCombo.style.width = "1px";
        injectedCombo.style.height = "1px";
        injectedCombo.style.left = "-9999px";
        setReady(true);
        window.clearInterval(timer);
      } else if (Date.now() - start > 8000) {
        // Give it a bit more time on slow connections.
        window.clearInterval(timer);
      }
    }, 100);
  }

  useEffect(() => {
    // Install callback before requesting script.
    window.googleTranslateElementInit = googleTranslateElementInit;

    // If script already loaded, just init.
    if (window.google?.translate) {
      googleTranslateElementInit();
      return;
    }

    // Avoid injecting script twice.
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://translate.google.com/translate_a/element.js"]'
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const setGoogTransCookie = (lang: string) => {
    const host = window.location.hostname;
    const domain = host && host.includes(".") ? `.${host}` : "";
    
    // Clear ALL existing googtrans cookies at every possible level
    // Google Translate can set cookies at different domain levels
    document.cookie = `googtrans=; path=/; max-age=0`;
    document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    if (domain) {
      document.cookie = `googtrans=; domain=${domain}; path=/; max-age=0`;
      document.cookie = `googtrans=; domain=${domain}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
    // Also clear at subdomain parts (e.g., .edvizi.net for test-app.edvizi.net)
    const parts = host.split(".");
    if (parts.length > 2) {
      const rootDomain = `.${parts.slice(-2).join(".")}`;
      document.cookie = `googtrans=; domain=${rootDomain}; path=/; max-age=0`;
      document.cookie = `googtrans=; domain=${rootDomain}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }

    // If selecting English or clearing, we're done (cookies cleared)
    if (!lang || lang === "en") {
      return;
    }

    // Set the new language cookie
    // Format expected by Google website translator: /en/fr (from English to French)
    const cookieValue = `/en/${lang}`;
    const maxAge = 31536000; // 1 year in seconds

    // Set cookie for current path
    document.cookie = `googtrans=${cookieValue}; path=/; max-age=${maxAge}; SameSite=Lax`;
    
    // Set cookie for root domain (needed for subdomains)
    if (domain) {
      document.cookie = `googtrans=${cookieValue}; domain=${domain}; path=/; max-age=${maxAge}; SameSite=Lax`;
    }
  };

  const fireNativeEvents = (el: HTMLSelectElement) => {
    // Some versions listen to `change`, others to `input`.
    el.dispatchEvent(new Event("input", { bubbles: true } as any));
    el.dispatchEvent(new Event("change", { bubbles: true } as any));
  };

  const setGoogleLanguage = (lang: string) => {
    // 1) Update our local state
    setValue(lang === "en" ? "" : lang);

    // 2) If the injected Google combo exists, set it and fire events
    const combo = document
      .getElementById("google_translate_element")
      ?.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo) {
      combo.value = lang === "en" ? "" : lang;
      fireNativeEvents(combo);
    }

    // 3) Set the cookie AFTER firing native events
    //    (Google's handler can re-set the cookie, so we override it last)
    //    Use setTimeout to ensure Google's handlers complete first
    setTimeout(() => {
      setGoogTransCookie(lang);
      window.location.reload();
    }, 100);
  };

  return (
    <div className="relative">
      {/* Host container for Google to inject its hidden combo */}
      <div id="google_translate_element" className="absolute left-[-9999px] top-[-9999px]" />

      <select
        aria-label="Select language"
        className="goog-te-combo"
        value={value}
        onChange={(e) => {
          const next = e.target.value;
          
          // Empty value means "Language" placeholder - do nothing
          if (next === "") return;

          // If not ready yet, force init; then proceed anyway (cookie + reload will still work).
          if (!ready) googleTranslateElementInit();
          
          // This handles both switching to another language AND switching back to English
          setGoogleLanguage(next);
        }}
        // Keep the dropdown visible and openable even while we load Google.
        disabled={false}
      >
        {LANGS.map((l) => (
          <option key={l.value || "_"} value={l.value}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
});

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const APP_STORE_URL = "https://apps.apple.com/pk/app/axs-map/id554015666";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.bonc.axsmapathon";

const Header = () => {
  const [getUserProfile] = useLazyGetUserQuery();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = useAppSelector((state) => state.token.token);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);
  const search = useAppSelector((state) => state.search.search);
  const storedLanguage = useAppSelector((state) => state.language.language);
  const router = useRouter();
  const pathname = usePathname();
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
    { href: "/", label: t("headerPlaces"), id: "Places", icon: HiHome },
    { href: "/mapathons", label: "Mapathons", id: "Mapathons", icon: HiMap },
    { href: "/teams", label: t("headerTeams"), id: "Teams", icon: HiUserGroup },
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
                  onClick={() => handleMenuClick(link.id)}
                  className={`flex items-center text-gray-900 py-2 
                  ${
                    selectedMenu === link.id ||
                    (link.id === "Places" && selectedMenu === null)
                      ? "border-b-2 border-[#FDDF00] text-[#000] font-bold text-lg"
                      : "text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4 justify-end">
              {/* App Store badges — desktop only */}
              <div className="hidden lg:flex items-center gap-2">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download on the App Store"
                  className="transition-opacity hover:opacity-70"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="30"
                    viewBox="0 0 120 40"
                  >
                    <rect width="120" height="40" rx="6" fill="#000" />
                    <text
                      x="42"
                      y="14"
                      fill="#fff"
                      fontSize="7"
                      fontFamily="Arial, sans-serif"
                    >
                      Download on the
                    </text>
                    <text
                      x="42"
                      y="28"
                      fill="#fff"
                      fontSize="13"
                      fontWeight="bold"
                      fontFamily="Arial, sans-serif"
                    >
                      App Store
                    </text>
                    <g transform="translate(12, 7) scale(0.55)">
                      <path
                        d="M22.4 0C22.1 2.7 20.8 5.2 18.8 7 16.9 8.7 14.3 9.7 11.8 9.5 11.5 6.9 12.9 4.1 14.7 2.5 16.6 0.8 19.4-0.1 22.4 0ZM30.5 39.9C29.1 42 27 44 24.2 44 21.5 44 20.4 42.3 17.2 42.3 13.9 42.3 12.7 44 10.1 44 7.3 44 5.3 42.1 3.9 40.1 1 35.7-0.3 27.6 2.8 22.3 5 18.7 8.6 16.5 12.5 16.4 15 16.4 17.1 18.3 17.1 18.3 17.1 18.3 19.4 16.2 22.4 16.4 23.7 16.4 27.3 16.9 29.7 20.3 29.4 20.5 24.7 23 24.8 28.7 24.8 35.5 30.7 37.8 30.5 39.9Z"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                </a>
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get it on Google Play"
                  className="transition-opacity hover:opacity-70"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="101"
                    height="30"
                    viewBox="0 0 135 40"
                  >
                    <rect width="135" height="40" rx="6" fill="#000" />
                    <text
                      x="47"
                      y="13"
                      fill="#fff"
                      fontSize="7"
                      fontFamily="Arial, sans-serif"
                      textAnchor="start"
                    >
                      GET IT ON
                    </text>
                    <text
                      x="47"
                      y="29"
                      fill="#fff"
                      fontSize="14"
                      fontWeight="bold"
                      fontFamily="Arial, sans-serif"
                      textAnchor="start"
                    >
                      Google Play
                    </text>
                    <g transform="translate(10, 6)">
                      <polygon points="0,2 16,14 0,26" fill="#36A9E1" />
                      <polygon points="0,2 16,14 20,10" fill="#34A853" />
                      <polygon points="0,26 16,14 20,18" fill="#FBBC04" />
                      <polygon points="20,10 16,14 20,18" fill="#EA4335" />
                    </g>
                  </svg>
                </a>
              </div>

              <button className="p-2 rounded-full" onClick={handleInfo}>
                <InfoCircleIcon />
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
              onClick={() => handleMenuClick(link.id)}
              className={`flex flex-col items-center text-white `}
            >
              <link.icon
                className={`md:h-6 md:w-6 h-4 w-4 mb-1 ${
                  selectedMenu === link.id ||
                  (link.id === "Places" && selectedMenu === null)
                    ? "text-[#FDDF00]"
                    : ""
                }`}
              />
              <span
                className={`md:text-xs text-[10px] ${
                  selectedMenu === link.id ||
                  (link.id === "Places" && selectedMenu === null)
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

      <InfoModal isOpen={isInfoOpen} onClose={handleCloseInfo} />
    </div>
  );
};

export default Header;
