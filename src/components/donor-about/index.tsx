import ArrowRightUp from "@/assets/icons/arrow-narrow-up-icom";
import FacebookIcon from "@/assets/icons/facebook-icon";
import TwitterIcon from "@/assets/icons/twitter-icon";
import YoutubeIcon from "@/assets/icons/youtube-icon";
import donorImage from "../../assets/images/donor-picture.png";
import Image from "next/image";
import React from "react";

export default function DonorAbout() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <Image
            src={donorImage}
            width={600}
            height={400}
            alt="Jason Dasilva"
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Get to know Jason Dasilva
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            When diagnosed with primary progressive multiple sclerosis at 25,
            filmmaker Jason Dasilva turned to art and storytelling, winning an
            Emmy for the film that told his journey from canes to walker, to
            wheelchair, When I Walk. Today, Jason is an acclaimed director,
            producer, writer, disability rights activist, and founder of AXS
            Lab. His goal? To spread awareness through stories, tools, and art,
            ultimately growing the world to include more experiences and more
            freedom for everyone.
          </p>
          <div className="inline-flex items-center gap-[40px]">
            <button className="flex h-[48px] py-[10px] px-[16px] justify-center items-center gap-[6px] rounded-[12px] bg-[#FEE633] shadow-[0px_4px_2.8px_0px_rgba(16,24,40,0.05)]">
              View All of Jason’s Films <ArrowRightUp />
            </button>

            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
