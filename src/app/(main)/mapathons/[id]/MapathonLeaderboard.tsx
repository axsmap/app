"use client";

import { useMapathonLeaderboardQuery } from "@/Services/modules/mapathon";
import type { MapathonLeaderboardUser } from "@/Services/modules/mapathon/leaderboard";
import { Award, LoaderCircle, Medal, Trophy, UserCircle } from "lucide-react";

const LEADERBOARD_LIMIT = 5;

const getDisplayName = (user: MapathonLeaderboardUser) => {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return fullName || user.username || "AXS Map user";
};

const getInitials = (user: MapathonLeaderboardUser) =>
  getDisplayName(user)
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
  return null;
};

const getLocationLabel = (locationsMapped: number) =>
  locationsMapped === 1 ? "location" : "locations";

interface MapathonLeaderboardProps {
  mapathonId: string;
}

export default function MapathonLeaderboard({
  mapathonId,
}: MapathonLeaderboardProps) {
  const { data, error, isError, isFetching, isLoading, refetch } =
    useMapathonLeaderboardQuery({
      eventId: mapathonId,
      limit: LEADERBOARD_LIMIT,
    });
  const users = data?.results ?? [];

  return (
    <div className="bg-white shadow-lg my-3 rounded-md p-5 border-[1px] border-gray-100">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-2xl sm:text-xl font-bold">Leaderboard</p>
          <p className="mt-1 text-sm text-gray-500">
            Users ranked by locations mapped in this Mapathon.
          </p>
        </div>
        {isFetching && !isLoading ? (
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Updating
          </div>
        ) : null}
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
        <div className="grid grid-cols-[64px_1fr_88px] gap-3 bg-gray-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-600 sm:grid-cols-[80px_1fr_112px]">
          <span>Rank</span>
          <span>User</span>
          <span className="text-right">Mapped</span>
        </div>

        {isLoading ? (
          <div className="flex min-h-40 flex-col items-center justify-center text-gray-500">
            <LoaderCircle className="mb-3 h-8 w-8 animate-spin" />
            <p className="text-sm">Loading leaderboard</p>
          </div>
        ) : null}

        {!isLoading && isError ? (
          <div className="flex min-h-40 flex-col items-center justify-center px-5 text-center">
            <UserCircle className="mb-3 h-10 w-10 text-gray-300" />
            <p className="font-semibold text-gray-900">
              Leaderboard data is not available yet
            </p>
            <p className="mt-2 max-w-md text-sm text-gray-600">
              The page is ready, but the API could not load this Mapathon&apos;s
              rankings.
            </p>
            <button
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-black"
              onClick={() => refetch()}
              type="button"
            >
              Try again
            </button>
            {process.env.NODE_ENV === "development" ? (
              <p className="mt-3 max-w-lg rounded-md bg-gray-100 px-3 py-2 text-left text-xs text-gray-700">
                {JSON.stringify(error)}
              </p>
            ) : null}
          </div>
        ) : null}

        {!isLoading && !isError && users.length === 0 ? (
          <div className="flex min-h-40 flex-col items-center justify-center px-5 text-center">
            <UserCircle className="mb-3 h-10 w-10 text-gray-300" />
            <p className="font-semibold text-gray-900">
              No mapped locations yet
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Users will appear here after they map locations for this
              Mapathon.
            </p>
          </div>
        ) : null}

        {!isLoading && !isError && users.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {users.map((user) => {
              // Standard "1224" ranking computed from reviewsAmount: ties
              // share the rank of the first user in the tie group, the next
              // distinct value skips ahead.
              const firstTiedIndex = users.findIndex(
                (u) => u.reviewsAmount === user.reviewsAmount
              );
              const position = firstTiedIndex + 1;
              return (
              <a
                className="grid grid-cols-[64px_1fr_88px] items-center gap-3 px-3 py-3 transition-colors hover:bg-primary/5 sm:grid-cols-[80px_1fr_112px]"
                href={`/mapathons/${mapathonId}/participant/${user.id}`}
                key={user.id}
              >
                <div className="flex items-center gap-1.5 font-semibold text-gray-900">
                  {getRankIcon(position)}
                  <span>#{position}</span>
                </div>

                <div className="flex min-w-0 items-center gap-3">
                  {user.avatar ? (
                    <img
                      alt=""
                      className="h-10 w-10 flex-none rounded-full object-cover"
                      src={user.avatar}
                    />
                  ) : (
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-700">
                      {getInitials(user)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900">
                      {getDisplayName(user)}
                    </p>
                    {user.username ? (
                      <p className="truncate text-sm text-gray-500">
                        @{user.username}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {user.reviewsAmount}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    {getLocationLabel(user.reviewsAmount)}
                  </p>
                </div>
              </a>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
