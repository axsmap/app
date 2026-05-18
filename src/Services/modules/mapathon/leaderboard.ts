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
    query: ({ eventId, limit = 5 }) => ({
      url: `events/${eventId}/leaderboard?limit=${limit}`,
    }),
  });

export default mapathonLeaderboard;
