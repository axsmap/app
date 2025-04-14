import { EndpointBuilder, BaseQueryFn } from "@reduxjs/toolkit/query";

const updateTeam = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<Response, UpdateTeamPayload>({
    query: (data) => ({
      url: `teams/${data.id}`,
      method: "PUT",
      body: data,
    }),
  });

export default updateTeam;

export type Response = {
  general: string;
};

export type UpdateTeamPayload = {
  name: string;
  description: string;
  avatar: string | null; // URL of the avatar image or null
  managers: string[]; // Array of manager IDs (strings)
  members: string[]; // Array of member IDs (strings)
  id: string | null; // The team's ID
};
