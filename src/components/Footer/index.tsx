import React from "react";
import facebook from "./images/facebook.png";
import twitter from "./images/twitter.png";
import youtube from "./images/youtube.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-4">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-[#717071] font-poppins text-sm font-normal">
          &copy; 2025 AXS MAP
        </p>

        <div className="flex gap-4 text-sm">
          <a
            href="#"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            FAQ
          </a>

          <a
            href="#"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            Shop
          </a>
          <a
            href="#"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            Terms & Conditions
          </a>
          <a
            href="#"
            className="text-[#444344] font-poppins text-sm font-normal"
          >
            Contact
          </a>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-white hover:text-gray-400">
            <Image src={facebook} alt="facebook" width={20} height={20} />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            {" "}
            <Image src={twitter} alt="facebook" width={20} height={20} />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            {" "}
            <Image src={youtube} alt="facebook" width={20} height={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
