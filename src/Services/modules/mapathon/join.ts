import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const joinMutation = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<Response, Payload>({
    query: (data) => ({
      url: `events/${data.eventId}/join`,
      method: "POST",
      body: data.userId,
    }),
    invalidatesTags: ["venue"],
  });

export default joinMutation;

export type Response = {
  general: string;
};

export type Payload = {
  eventId: string;
  userId: string;
};
