"use client";
import React from "react";
import facebook from "./images/facebook.png";
import twitter from "./images/twitter.png";
import youtube from "./images/youtube.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white text-black py-4 px-4 md:px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
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

        <div className="flex gap-4 justify-center mt-4 md:mt-0">
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
