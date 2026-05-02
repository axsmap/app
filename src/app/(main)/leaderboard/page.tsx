"use client";

import { useLeaderboardQuery } from "@/Services/modules/users";
import type {
  LeaderboardPeriod,
  LeaderboardUser,
} from "@/Services/modules/users/leaderboard";
import { Award, LoaderCircle, Medal, Trophy, UserCircle } from "lucide-react";
import { useState } from "react";

const PAGE_LIMIT = 20;

const getDisplayName = (user: LeaderboardUser) => {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return fullName || user.username || "AXS Map user";
};

const getInitials = (user: LeaderboardUser) =>
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

const getErrorMessage = (error: unknown) => {
  if (!error) return "Unknown error";
  if (typeof error === "object" && error !== null && "status" in error) {
    const status = (error as { status: unknown }).status;
    const data =
      "data" in error ? (error as { data: unknown }).data : undefined;
    const detail = data ? JSON.stringify(data) : "";
    return `Status: ${String(status)} ${detail}`;
  }
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return JSON.stringify(error);
};

const LeaderboardPage = () => {
  const [period, setPeriod] = useState<LeaderboardPeriod>("allTime");
  const { data, error, isFetching, isLoading, isError, refetch } =
    useLeaderboardQuery({ limit: PAGE_LIMIT, period });

  const users = data?.results ?? [];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-10">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Top AXS Map contributors ranked by locations reviewed.
            </p>
          </div>

          <div className="inline-flex w-full rounded-lg border border-gray-200 bg-white p-1 shadow-sm md:w-auto">
            <button
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium md:flex-none ${
                period === "allTime"
                  ? "bg-yellow-400 text-gray-950"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setPeriod("allTime")}
              type="button"
            >
              All time
            </button>
            <button
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium md:flex-none ${
                period === "month"
                  ? "bg-yellow-400 text-gray-950"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setPeriod("month")}
              type="button"
            >
              This month
            </button>
          </div>
        </div>

        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="grid grid-cols-[72px_1fr_120px] gap-3 border-b border-gray-200 bg-gray-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 md:grid-cols-[96px_1fr_180px]">
            <span>Rank</span>
            <span>Contributor</span>
            <span className="text-right">Reviews</span>
          </div>

          {isLoading ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-gray-500">
              <LoaderCircle className="mb-3 h-9 w-9 animate-spin" />
              <p className="text-sm">Loading leaderboard</p>
            </div>
          ) : null}

          {!isLoading && isError ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <UserCircle className="mb-3 h-12 w-12 text-gray-300" />
              <h2 className="text-lg font-semibold text-gray-900">
                Leaderboard data is not available yet
              </h2>
              <p className="mt-2 max-w-md text-sm text-gray-600">
                The page is ready, but the browser could not load leaderboard
                data from the API.
              </p>
              <p className="mt-3 max-w-lg rounded-md bg-gray-100 px-4 py-3 text-left text-xs text-gray-700">
                {getErrorMessage(error)}
              </p>
              <button
                className="mt-5 rounded-lg bg-yellow-400 px-5 py-2 font-medium text-gray-950"
                onClick={() => refetch()}
                type="button"
              >
                Try again
              </button>
            </div>
          ) : null}

          {!isLoading && !isError && users.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <UserCircle className="mb-3 h-12 w-12 text-gray-300" />
              <h2 className="text-lg font-semibold text-gray-900">
                No ranked users yet
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Once users begin reviewing locations, they will appear here.
              </p>
            </div>
          ) : null}

          {!isLoading && !isError && users.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {users.map((user) => (
                <div
                  className="grid grid-cols-[72px_1fr_120px] items-center gap-3 px-4 py-4 md:grid-cols-[96px_1fr_180px]"
                  key={user.id}
                >
                  <div className="flex items-center gap-2 font-semibold text-gray-900">
                    {getRankIcon(user.ranking)}
                    <span>#{user.ranking}</span>
                  </div>

                  <div className="flex min-w-0 items-center gap-3">
                    {user.avatar ? (
                      <img
                        alt=""
                        className="h-11 w-11 flex-none rounded-full object-cover"
                        src={user.avatar}
                      />
                    ) : (
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-700">
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
                      locations
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </section>

        {isFetching && !isLoading ? (
          <div className="mt-6 flex justify-center text-sm text-gray-500">
            Updating leaderboard
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default LeaderboardPage;
