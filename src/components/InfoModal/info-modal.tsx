"use-client";
import CloseMenuIcon from "@/assets/icons/close-menu-icon";
import logo from "../Header/images/logo.png";
import banner from "../../../public/main-banner.png";
import React from "react";
import Image from "next/image";
import Entrance from "../Card/images/entrance.png";
import Intrance from "../Card/images/interance.png";
import Restroom from "../Card/images/restroom.png";

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-4/5 max-w-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-xl"
        >
          <CloseMenuIcon />
        </div>

        <Image
          src={logo}
          alt="AXS Map Logo"
          width={180}
          height={100}
          className="flex flex items-center justify-center"
        />
        <Image
          src={banner}
          alt="AXS Main Banner"
          width={800}
          height={800}
          className="mt-8"
        />

        <h2 className="flex flex items-center justify-center text-2xl font-bold mt-4">
          Welcome to AXS Map,
        </h2>
        <p className="text-gray-700 mt-2 text-center">
          A tool designed to help us map inclusion in communities and find more
          places for more people.
        </p>
        <h2 className="flex flex items-center justify-center text-xl font-bold mt-4 text-gray-600">
          The Rating SYSTEM
        </h2>
        <p className="text-gray-700 mt-2 text-center">
          Our icon system lets you determine at a glance how users have rated a
          venue for accessibility, across three different phases.
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-center">Venue Phases</h3>
          <div className="grid grid-cols-3">
            <div className="flex flex-col items-center">
              <Image
                src={Entrance}
                alt="Entrance Icon"
                width={40}
                height={40}
              />
              <span className="mt-2 text-sm">Entrance</span>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={Intrance}
                alt="Interior Icon"
                width={40}
                height={40}
              />
              <span className="mt-2 text-sm">Interior</span>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={Restroom}
                alt="Restroom Icon"
                width={40}
                height={40}
              />
              <span className="mt-2 text-sm">Restroom</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
