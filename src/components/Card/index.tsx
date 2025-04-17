"use client";

import Image from "next/image";
import React, { FC } from "react";
import Entrance from "../Card/images/entrance.png";
import Intrance from "../Card/images/interance.png";
import Restroom from "../Card/images/restroom.png";

interface CardProps {
  imageSrc?: any;
  selectedVenue?: boolean;
  title: string;
  description: string;
  distance: string;
  buttonText: string;
  onButtonClick: () => void;
}

const CardComponent: FC<CardProps> = ({
  imageSrc,
  title,
  description,
  selectedVenue,
  distance,
  buttonText,
  onButtonClick,
}) => {
  return (
    <>
      {!selectedVenue && (
        <div className="flex bg-gray-100 p-4 rounded-lg gap-4">
          <div className="w-1/2 flex flex-col items-center">
            <h4 className="text-sm font-[500] bg-color[#363537] mb-4 self-start">
              {title}
            </h4>
            <h5 className="text-sm font-[500] bg-color[#363537] mb-4 self-start">
              {distance}
            </h5>
            {imageSrc ? (
              <Image
                src={imageSrc || null}
                height={80}
                width={80}
                alt={title}
                className="rounded-lg w-full h-auto object-cover"
              />
            ) : (
              <div className="card-placeholder">No Image Available</div>
            )}
          </div>
          <div className="w-1/2 bg-white border shadow-lg rounded-lg p-4 flex flex-col">
            <div className="flex gap-4 mb-1 ">
              <button className="text-[#363537] text-center text-[10px] font-normal leading-normal ">
                <Image src={Entrance} alt="Entrance" width={23} height={26} />{" "}
                Entrance
              </button>
              <button className="text-[#363537] text-center text-[10px] font-normal leading-normal ">
                <Image src={Intrance} alt="Intrance" width={23} height={26} />
                Intrance
              </button>
              <button className="text-[#363537] text-center text-[10px] font-normal leading-normal ">
                <Image src={Restroom} alt="Intrance" width={23} height={26} />
                Restroom
              </button>
            </div>
            <p className="text-sm mb-2 text-[#787879] text-[12px]">
              {description}
            </p>
            <button
              className="btn-secondary py-2 px-4 "
              onClick={onButtonClick}
            >
              {buttonText}
            </button>
          </div>
        </div>
      )}

      {selectedVenue && (
        <>
          <h4 className="mb-4 text-sm font-semibold text-[#363537]">{title}</h4>
          <div className="mb-4 flex justify-between w-full">
            <button className="flex flex-col items-center text-[#363537] text-[10px] font-normal leading-normal">
              <Image src={Entrance} alt="Entrance" width={23} height={26} />
              Entrance
            </button>
            <button className="flex flex-col items-center text-[#363537] text-[10px] font-normal leading-normal">
              <Image src={Intrance} alt="Interior" width={23} height={26} />
              Interior
            </button>
            <button className="flex flex-col items-center text-[#363537] text-[10px] font-normal leading-normal">
              <Image src={Restroom} alt="Restroom" width={23} height={26} />
              Restroom
            </button>
          </div>

          <p className="mb-4 text-[#787879] text-[12px]">
            This venue has no ratings.
          </p>

          <button
            className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
            onClick={onButtonClick}
          >
            ADD A REVIEW
          </button>
        </>
      )}
    </>
  );
};

export default CardComponent;
