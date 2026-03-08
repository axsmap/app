import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const deleteMapathonEndpoint = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.mutation<DeleteResponse, string>({
    query: (eventId) => ({
      url: `events/${eventId}`,
      method: "DELETE",
    }),
    invalidatesTags: ["venue"],
  });

export type DeleteResponse = {
  general: string;
};

export default deleteMapathonEndpoint;
