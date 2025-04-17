import React from "react";
import facebook from "./images/facebook.png";
import twitter from "./images/twitter.png";
import youtube from "./images/youtube.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-4 px-4 md:px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-[#717071] font-poppins text-sm font-normal text-center md:text-left">
          &copy; 2025 AXS MAP
        </p>

        <div className="flex flex-wrap gap-4 text-sm justify-center md:justify-start">
          <a
            href="/faq"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            FAQ
          </a>
          <a
            href="https://axslab.buyproforma.com/"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            Shop
          </a>
          <a
            href="/privacy-policy"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-condition"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            Terms & Conditions
          </a>
          <a
            href="/contact"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            Contact
          </a>
        </div>

        <div className="flex gap-4 justify-center mt-4 md:mt-0">
          <a
            href="https://www.facebook.com/axsmap"
            className="text-white hover:text-gray-400"
          >
            <Image src={facebook} alt="facebook" width={20} height={20} />
          </a>
          <a
            href="https://twitter.com/axsmap"
            className="text-white hover:text-gray-400"
          >
            <Image src={twitter} alt="twitter" width={20} height={20} />
          </a>
          <a
            href="https://www.youtube.com/axsmaptv"
            className="text-white hover:text-gray-400"
          >
            <Image src={youtube} alt="youtube" width={20} height={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
