import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const joinTeam = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<Response, JoinTeamPayload>({
    query: ({ id, userId }) => ({
      url: `teams/${id}/join`,
      method: "POST",
      body: { userId },
    }),
    invalidatesTags: ["team"],
  });

export default joinTeam;

export type Response = {
  general: string;
};

export type JoinTeamPayload = {
  id: string; // Team ID
  userId: string; // User ID
};
