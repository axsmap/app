"use client";
import RankIcon from "@/assets/icons/rank-icon";
import RefereshIcon from "@/assets/icons/refresh-icon";
import TeamStarIcon from "@/assets/icons/star-team-icon";
import TeamUserIcon from "@/assets/icons/team-user-icon";
import { validateLogin } from "@/components/AuthModal/handleAuthModal";
import { useLazyTeamQuery } from "@/Services/modules/team";
import type { TeamItem } from "@/Services/modules/team/team";
import { LoaderCircle, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 12;

const Teams = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [teams, setTeams] = useState<TeamItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [fetchTeams, { isLoading }] = useLazyTeamQuery();

  const loadTeams = useCallback(
    async (page: number) => {
      try {
        const res = await fetchTeams({
          keywords: "",
          page,
        }).unwrap();

        const newResults = res?.results ?? [];

        setTeams((prev) =>
          page === 1 ? newResults : [...prev, ...newResults]
        );
        setHasMore(
          page < (res?.lastPage ?? 1)
        );
        setCurrentPage(page);
      } catch (err) {
        console.error("Failed to load teams:", err);
      } finally {
        setInitialLoading(false);
      }
    },
    [fetchTeams]
  );

  useEffect(() => {
    loadTeams(1);
  }, [loadTeams]);

  const handleCreate = () => {
    router.push("/teams/create-teams");
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      loadTeams(currentPage + 1);
    }
  };

  return (
    <div className="container m-auto px-4 py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{t("teamsPageTitle")}</h2>

        <div className="flex gap-4 items-center">
          <button
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg"
            onClick={validateLogin(handleCreate)}
          >
            {t("teamsCreateButton")}
          </button>
        </div>
      </div>

      {/* Loading state */}
      {initialLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <LoaderCircle className="h-10 w-10 animate-spin mb-3" />
          <p className="text-sm">{t("teamsLoading")}</p>
        </div>
      )}

      {/* Empty state */}
      {!initialLoading && teams.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Users className="h-12 w-12 mb-3" />
          <p className="font-medium text-gray-600">{t("teamsEmpty")}</p>
          <p className="text-sm mt-1">{t("teamsEmptyHint")}</p>
        </div>
      )}

      {/* Teams grid */}
      {teams.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teams.map((team: TeamItem) => (
            <div
              key={team.id}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl flex flex-col"
            >
              <Link href={`/teams/${team.id}`}>
                <div className="w-full">
                  <Image
                    src={team.avatar}
                    alt="Team Image"
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="w-full p-4">
                  <h3 className="font-semibold text-lg">{team.name}</h3>
                  <p className="text-sm text-gray-600">{team.description}</p>
                  <div className="w-full p-1 flex justify-between items-center ">
                    <div className="flex flex-col items-center mt-2 ">
                      <RankIcon />
                      <p className="text-sm text-gray-600 text-[10px] text-center items-left">
                        {t("teamsRankLabel")} {team.ranking}
                      </p>
                    </div>
                    <div className="flex flex-col items-center mt-2">
                      <TeamStarIcon />
                      <p className="text-sm text-gray-600 text-[10px] text-center items-left">
                        {t("teamsReviewsLabel")} {team.reviewsAmount}
                      </p>
                    </div>
                    <div className="flex flex-col items-center mt-2">
                      <TeamUserIcon />
                      <p className="text-sm text-gray-600 text-[10px] text-center items-left">
                        {t("teamsMembersLabel")} {team.members?.total ?? 0}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Load More button — only show when there are teams and more pages */}
      {teams.length > 0 && hasMore && (
        <div className="flex justify-center mt-6">
          <button
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 pl-[14px] rounded-lg bg-[#FDDF00] text-[#363537]"
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            <RefereshIcon className={isLoading ? "animate-spin" : ""} />
            <span>{t("teamsLoadMoreButton")}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Teams;
