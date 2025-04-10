import Image from "next/image";
import React from "react";
import FacebookIcon from "@/assets/icons/facebook-icon";
import TwitterIcon from "@/assets/icons/twitter-icon";
import RankIcon from "@/assets/icons/rank-icon";
import TeamStarIcon from "@/assets/icons/star-team-icon";
import MapIcon from "@/assets/icons/map-icon";
import { useParams, useRouter } from "next/navigation";
import { useTeamDetailsQuery } from "@/app/Services/modules/team";

interface Team {
  id: string;
  name: string;
  description: string;
  avatar: string;
  ranking: number;
  reviewsAmount: number;
  members: [];
}

const TeamDetailOverview = () => {
  const router = useRouter();
  const id = useParams()?.id;
  const { data: team } = useTeamDetailsQuery(id as string);
  const teamData = team as Team;

  const handleEdit = () => {
    router.push(`/teams/create-teams/${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-center gap-6">
      <div className="w-max-auto flex-shrink-0">
        {teamData && (
          <Image
            src={teamData?.avatar || null}
            alt="Team Banner"
            width={400}
            height={400}
            className="rounded-xl object-cover"
          />
        )}
      </div>
      <div className="flex flex-col items-start gap-1 w-[650px] pt-5 flex-shrink-0">
        <h2 className="text-2xl font-semibold">{teamData?.name}</h2>
        <p className="text-gray-600">{teamData?.description}</p>

        <div className="flex flex-col justify-center items-start gap-6 text-sm">
          <p className="flex justify-center items-center gap-2">
            <RankIcon /> <span className="font-semibold">Rank:</span>{" "}
            {teamData?.ranking}
          </p>
          <p className="flex justify-center items-center gap-2">
            <TeamStarIcon /> <span className="font-semibold">Reviews:</span>{" "}
            {teamData?.reviewsAmount}
          </p>
          {/* <p className="flex justify-center items-center gap-2">
            <TeamUserIcon /> <span className="font-semibold">Members:</span>{" "}
            {team?.members}
          </p> */}
          <p className="flex justify-center items-center gap-2">
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
        <div className="mt-6">
          {teamData?.events?.length > 0 ? (
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg">
              + Join Team
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg"
            >
              Edit Team
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDetailOverview;
