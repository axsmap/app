"use-client";
import CloseMenuIcon from "@/assets/icons/close-menu-icon";
import banner from "../../../public/main-banner.png";
import logo from "../../components/Header/images/logo.png";
import React from "react";
import Image from "next/image";
import Entrance from "../Card/images/entrance.png";
import Intrance from "../Card/images/interance.png";
import Restroom from "../Card/images/restroom.png";
import EntranceIcon from "@/assets/icons/entrance-icon";
import IntranceIcon from "@/assets/icons/intrance-icon";
import RestroomIcon from "@/assets/icons/restroom-icon";

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-4/5 max-w-lg relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-xl"
        >
          <CloseMenuIcon />
        </div>
        <div className="bg-[#2D2635] mt-8 flex flex items-center justify-center">
          <Image src={logo} alt="AXS Map Logo" width={180} height={180} />
        </div>

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
        <h2 className="flex flex items-center justify-center text-xl font-bold mt-4 text-gray-800">
          The Rating SYSTEM
        </h2>
        <p className="text-gray-700 mt-2 text-center">
          Our icon system lets you determine at a glance how users have rated a
          venue for accessibility, across three different phases.
        </p>
        <div className="mt-6 bg-gray-100 rounded-md">
          <div className="p-2 rounded-md">
            <h3 className="text-center text-lg font-semibold mb-4">
              VENUE PHASES
            </h3>
            <div className="grid grid-cols-3 ">
              <div className="flex flex-col items-center">
                <Image
                  src={Entrance}
                  alt="Entrance Icon"
                  width={40}
                  height={40}
                />
                <span className="mt-2 text-sm font-medium">ENTRANCE</span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src={Intrance}
                  alt="Interior Icon"
                  width={40}
                  height={40}
                />
                <span className="mt-2 text-sm font-medium">INTERIOR</span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src={Restroom}
                  alt="Restroom Icon"
                  width={40}
                  height={40}
                />
                <span className="mt-2 text-sm font-medium">RESTROOM</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-md mt-4">
            <h3 className="text-center text-lg font-semibold mb-4">
              COLOR SYSTEM
            </h3>
            <div className="grid grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-600 rounded"></div>
                <span className="mt-2 text-sm font-medium">ACCESSIBLE</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-yellow-400 rounded"></div>
                <span className="mt-2 text-sm font-medium">CAUTION</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-orange-500 rounded"></div>
                <span className="mt-2 text-sm font-medium">ALERT</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="flex flex items-center justify-center text-xl font-bold mt-4 text-gray-800">
          RATED FULLY ACCESSIBLE
        </h2>

        <div className="mt-6 grid grid-cols-3 ">
          <div className="flex flex-col items-center">
            <div className="bg-green-600 p-2 rounded">
              <IntranceIcon />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-600 p-2 rounded">
                <EntranceIcon />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-600 p-2 rounded">
                <RestroomIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
