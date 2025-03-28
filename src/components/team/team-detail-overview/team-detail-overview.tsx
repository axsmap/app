import Image from "next/image";
import React from "react";
import FacebookIcon from "@/assets/icons/facebook-icon";
import TwitterIcon from "@/assets/icons/twitter-icon";
import RankIcon from "@/assets/icons/rank-icon";
import TeamStarIcon from "@/assets/icons/star-team-icon";
import TeamUserIcon from "@/assets/icons/team-user-icon";
import MapIcon from "@/assets/icons/map-icon";

interface Team {
  id: string;
  teamImage: string;
  rank: number;
  reviews: number;
  members: number;
}

interface Props {
  team: Team;
}

const TeamDetailOverview = async ({ team }: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="w-full md:w-1/2">
        <Image
          src={team.teamImage}
          alt="Team Banner"
          width={600}
          height={400}
          className="rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-col items-start gap-6 w-[650px] pt-5 flex-shrink-0">
        <h2 className="text-2xl font-semibold">Masters Inclusive Design</h2>
        <p className="text-gray-600">
          Master Student Inclusive Design at OCAD U
        </p>

        <div className="flex flex-col justify-center items-start gap-6 text-sm">
          <p className="flex justify-center items-center gap-5">
            <RankIcon /> <span className="font-semibold">Rank:</span>{" "}
            {team.rank}
          </p>
          <p className="flex justify-center items-center gap-5">
            <TeamStarIcon /> <span className="font-semibold">Reviews:</span>{" "}
            {team.reviews}
          </p>
          <p className="flex justify-center items-center gap-5">
            <TeamUserIcon /> <span className="font-semibold">Members:</span>{" "}
            {team.members}
          </p>
          <p className="flex justify-center items-center gap-5">
            <MapIcon width={21} height={21} />{" "}
            <span className="font-semibold">Mapathon:</span>{" "}
            <a href="#" className="text-blue-600 underline">
              La Vida Scholars Lynn AXS Mapathon
            </a>
          </p>
          <p className="text-[#353435] font-medium text-base leading-[22px] font-poppins">
            Share:
          </p>
        </div>

        <div className="flex gap-6">
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
        </div>
      </div>
    </div>
  );
};

export default TeamDetailOverview;
