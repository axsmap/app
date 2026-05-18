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
  limit?: number;
  period?: LeaderboardPeriod;
};

export type LeaderboardResponse = {
  period: LeaderboardPeriod;
  results: LeaderboardUser[];
};

const leaderboard = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<LeaderboardResponse, LeaderboardPayload | void>({
    query: (payload) => {
      const limit = payload?.limit ?? 20;
      const period = payload?.period ?? "allTime";
      return {
        url: `users/leaderboard?period=${period}&limit=${limit}`,
      };
    },
  });

export default leaderboard;
