import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { EndpointBuilder } from "@reduxjs/toolkit/query";

const eventDetails = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query({
    query: (id) => ({
      url: `events/${id}`,
    }),
    keepUnusedDataFor: 0,
    providesTags: ["venue"],
  });

export default eventDetails;
