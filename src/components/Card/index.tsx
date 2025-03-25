"use client";

import Image from "next/image";
import React, { FC } from "react";
import Entrance from "../Card/images/entrance.png";
import Intrance from "../Card/images/interance.png";
import Restroom from "../Card/images/restroom.png";

// Generic Card Component
interface CardProps {
  imageSrc: any;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

const CardComponent: FC<CardProps> = ({
  imageSrc,
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex bg-gray-100 p-4 rounded-lg gap-4">
      <div className="w-1/2 flex flex-col items-center">
        <h4 className="text-sm font-[500] bg-color[#363537] mb-4 self-start">
          {title}
        </h4>
        <Image
          src={imageSrc}
          alt={title}
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>
      <div className="w-1/2 bg-white border shadow-lg rounded-lg p-4 flex flex-col">
        <div className="flex gap-4 mb-1 ">
          <button className="text-[#363537] text-center text-[10px] font-normal leading-normal ">
            <i className="fas fa-couch"></i> Entrance
            <Image src={Entrance} alt="Entrance" width={23} height={26} />
          </button>
          <button className="text-[#363537] text-center text-[10px] font-normal leading-normal ">
            <i className="fas fa-couch"></i> Interior
            <Image src={Intrance} alt="Intrance" width={23} height={26} />
          </button>
          <button className="text-[#363537] text-center text-[10px] font-normal leading-normal ">
            <i className="fas fa-restroom"></i> Restroom
            <Image src={Restroom} alt="Intrance" width={23} height={26} />
          </button>
        </div>
        <p className="text-sm mb-2 text-[#787879] text-[12px]">{description}</p>
        <button className="btn-secondary py-2 px-4 " onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CardComponent;
