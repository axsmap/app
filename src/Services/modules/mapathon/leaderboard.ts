import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

export type MapathonLeaderboardUser = {
  id: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  reviewsAmount: number;
  ranking: number;
};

export type MapathonLeaderboardPayload = {
  eventId: string;
  limit?: number;
  cacheKey?: number;
};

export type MapathonLeaderboardResponse = {
  page: number | null;
  lastPage: number | null;
  total: number;
  results: MapathonLeaderboardUser[];
};

const mapathonLeaderboard = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.query<MapathonLeaderboardResponse, MapathonLeaderboardPayload>({
    query: (payload) => {
      const limit = payload.limit ?? 5;
      const cacheKey = payload.cacheKey ?? Date.now();

      return {
        url: `${window.location.origin}/api/mapathons/${payload.eventId}/leaderboard?limit=${limit}&_=${cacheKey}`,
      };
    },
    keepUnusedDataFor: 0,
  });

export default mapathonLeaderboard;
