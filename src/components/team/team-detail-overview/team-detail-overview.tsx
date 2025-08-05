"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FacebookIcon from "@/assets/icons/facebook-icon";
import TwitterIcon from "@/assets/icons/twitter-icon";
import RankIcon from "@/assets/icons/rank-icon";
import TeamStarIcon from "@/assets/icons/star-team-icon";
import MapIcon from "@/assets/icons/map-icon";
import { useParams, useRouter } from "next/navigation";
import {
  useJoinTeamMutation,
  useTeamDetailsQuery,
} from "@/Services/modules/team";
import { useTranslation } from "react-i18next";
import { useGetUserQuery } from "@/Services/modules/users";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { showToast } from "@/components/toast";

interface Team {
  id: string;
  name: string;
  description: string;
  avatar: string;
  ranking: number;
  reviewsAmount: number;
  members: [];
}
interface ApiError {
  data: {
    general: string;
  };
}

const TeamDetailOverview = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const id = useParams()?.id;
  const [url, setUrl] = useState("");
  const { data: userProfile } = useGetUserQuery();
  const [joinTeam, { isLoading }] = useJoinTeamMutation(id);
  const { data: team } = useTeamDetailsQuery(id as string);
  const teamData = team as Team;
  const handleEdit = () => {
    router.push(`/teams/create-teams/${id}`);
  };
  useEffect(() => {
    const path = window.location.href;
    setUrl(path);
  }, [url]);

  const handleJoinTeam = async () => {
    try {
      if (userProfile?.id && id) {
        await joinTeam({ id, userId: userProfile.id }).unwrap();
        showToast({message:t("teamJoinRequestSuccess"), type:'success'});
      }
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage = apiError?.data?.general || t("unexpectedError");
      showToast({message:errorMessage, type:'error'});
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
      <div className="w-full md:w-1/3 flex-shrink-0">
        {teamData && (
          <Image
            src={teamData?.avatar || "/placeholder.jpg"}
            alt={t("teamBannerAlt")}
            width={400}
            height={400}
            className="rounded-xl object-cover w-full"
          />
        )}
      </div>
      <div className="flex flex-col items-start gap-4 w-full md:w-2/3 pt-5">
        <h2 className="text-2xl font-semibold">{teamData?.name}</h2>
        <p className="text-gray-600">{teamData?.description}</p>

        <div className="flex flex-col justify-start items-start gap-6 text-sm">
          <p className="flex items-center gap-2">
            <RankIcon />{" "}
            <span className="font-semibold">{t("teamRankLabel")}:</span>{" "}
            {teamData?.ranking}
          </p>
          <p className="flex items-center gap-2">
            <TeamStarIcon />{" "}
            <span className="font-semibold">{t("teamReviewsLabel")}:</span>{" "}
            {teamData?.reviewsAmount}
          </p>
          <p className="flex items-center gap-2">
            <MapIcon width={21} height={21} />{" "}
            <span className="font-semibold">{t("teamMapathonLabel")}:</span>{" "}
            <a href="#" className="text-blue-600 underline">
              {t("teamMapathonName")}
            </a>
          </p>
          <p className="text-[#353435] font-medium text-base leading-[22px] font-poppins">
            {t("teamShareLabel")}
          </p>
        </div>

        <div className="flex gap-6">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            <FacebookIcon />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              url
            )}&text=Check%20out%20this%20Mapathon%20event!`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            <TwitterIcon />
          </a>
        </div>
        <div className="mt-6">
          {teamData?.events?.length > 0 ? (
            <button
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg w-full md:w-auto"
              onClick={handleJoinTeam}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                t("teamJoinButton")
              )}
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg w-full md:w-auto"
            >
              {t("teamEditButton")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDetailOverview;
