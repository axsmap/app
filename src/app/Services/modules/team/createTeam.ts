import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const createTeamMutation = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.mutation<TeamResponse, TeamPayload>({
    query: (data) => ({
      url: `teams`,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["team"],
  });

export default createTeamMutation;

export type TeamResponse = {
  general: string;
};

export type TeamPayload = {
  name: string;
  description: string;
  avatar: string;
};
