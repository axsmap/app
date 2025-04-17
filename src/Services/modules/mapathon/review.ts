import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const createReviewMutation = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.mutation<ReviewResponse, ReviewPayload>({
    query: (data: ReviewPayload) => ({
      url: `reviews`,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["venue"],
  });

export type ReviewPayload = {
  name: string;
  photo: string;
};

export type ReviewResponse = {
  data: {
    general: string;
  };
};

export default createReviewMutation;
