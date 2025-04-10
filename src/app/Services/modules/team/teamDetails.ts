import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const teamDetails = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query({
    query: (id) => ({
      url: `teams/${id}`,
    }),
    keepUnusedDataFor: 0,
    providesTags: ["team"],
  });

export default teamDetails;
