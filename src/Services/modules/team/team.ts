import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

type TeamPayload = {
  keywords: string;
  page?: number;
};

export type TeamItem = {
  id: string;
  name: string;
  avatar: string;
  description: string;
  ranking: number;
  reviewsAmount: number;
  members?: { total: number };
};

export type TeamResponse = {
  page: number;
  lastPage: number;
  pageLimit: number;
  total: number;
  sortBy: string;
  results: TeamItem[];
};

const team = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<TeamResponse, TeamPayload>({
    query: (payload) => ({
      url: `teams?keywords=${payload.keywords}&page=${payload.page}`,
    }),
    keepUnusedDataFor: 0,
    providesTags: ["team"],
  });

export default team;
