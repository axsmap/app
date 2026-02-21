"use client";
import React from "react";
import facebook from "./images/facebook.png";
import twitter from "./images/twitter.png";
import youtube from "./images/youtube.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/utils/constants";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white text-black py-4 px-4 md:px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[#717071] font-poppins text-sm font-normal text-center md:text-left">
          {t("copyright")}
        </p>

        <div className="flex flex-wrap gap-4 text-sm justify-center md:justify-start">
          <Link
            href="/faq"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            {t("faq")}
          </Link>
          <Link
            href="https://axslab.buyproforma.com/"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            {t("shop")}
          </Link>
          <Link
            href="/privacy-policy"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            {t("privacyPolicy")}
          </Link>
          <Link
            href="/terms-condition"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            {t("termsConditions")}
          </Link>
          <Link
            href="/contact"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            {t("contact")}
          </Link>
        </div>

        {/* App Download Badges */}
        <div className="flex items-center gap-3">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on the App Store"
            className="inline-block transition-opacity hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="40"
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
            className="inline-block transition-opacity hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="135"
              height="40"
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

        <div className="flex gap-4 justify-center">
          <Link
            href="https://www.facebook.com/axsmap"
            className="text-white hover:text-gray-400"
          >
            <Image
              src={facebook}
              alt={t("facebookAlt")}
              width={20}
              height={20}
            />
          </Link>
          <Link
            href="https://twitter.com/axsmap"
            className="text-white hover:text-gray-400"
          >
            <Image src={twitter} alt={t("twitterAlt")} width={20} height={20} />
          </Link>
          <Link
            href="https://www.youtube.com/axsmaptv"
            className="text-white hover:text-gray-400"
          >
            <Image src={youtube} alt={t("youtubeAlt")} width={20} height={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
