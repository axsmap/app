import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

export type LeaderboardPeriod = "allTime" | "month";

export type LeaderboardUser = {
  id: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  reviewsAmount: number;
  ranking: number;
};

export type LeaderboardPayload = {
  page?: number;
  limit?: number;
  period?: LeaderboardPeriod;
  cacheKey?: number;
};

export type LeaderboardResponse = {
  page: number;
  lastPage: number;
  total: number;
  results: LeaderboardUser[];
};

const leaderboard = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<LeaderboardResponse, LeaderboardPayload | void>({
    query: (payload) => {
      const page = payload?.page ?? 1;
      const limit = payload?.limit ?? 20;
      const period = payload?.period ?? "allTime";
      const cacheKey = payload?.cacheKey ?? Date.now();

      return {
        url: `${window.location.origin}/api/users/leaderboard?page=${page}&limit=${limit}&period=${period}&_=${cacheKey}`,
      };
    },
    keepUnusedDataFor: 0,
  });

export default leaderboard;
