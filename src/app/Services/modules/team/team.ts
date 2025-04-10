import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

type TeamPayload = {
  keywords: string;
  page?: number;
};

type TeamProps = { id: string; name: string };

const team = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<TeamProps, TeamPayload>({
    query: (payload) => ({
      url: `teams?keywords=${payload.keywords}&page=${payload.page}`,
    }),
    keepUnusedDataFor: 0,
    providesTags: ["team"],
  });

export default team;
