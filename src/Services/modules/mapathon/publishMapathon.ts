import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const publishMapathonEndpoint = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.mutation<PublishResponse, string>({
    query: (eventId) => ({
      url: `events/${eventId}/publish`,
      method: "PUT",
    }),
    invalidatesTags: ["venue"],
  });

export type PublishResponse = {
  general: string;
};

export default publishMapathonEndpoint;
