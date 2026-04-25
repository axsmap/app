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
  place: string;
  comments?: string;
  event?: string;
  team?: string;
  photo?: string;
  steps?: 0 | 1 | 2 | 3;
  has1Step?: boolean;
  has2Step?: boolean;
  hasPermanentRamp?: boolean;
  hasWideEntrance?: boolean;
  multipleFloors?: boolean;
  hasAccessibleElevator?: boolean;
  hasWashroom?: boolean;
  hasLargeStall?: boolean;
  hasSupportAroundToilet?: boolean;
};

export type ReviewResponse = {
  data: {
    general: string;
  };
  venue: string;
  userReviewsAmount: number;
  userReviewFieldsAmount: number;
};

export default createReviewMutation;
