import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

type MapathonPayload = {
  name: string;
  description: string;
  location: string;
  startingPoint: string;
  donationEnabled: boolean;
  donationAmounts: { value: number }[];
  donationGoal: number;
  endDate: string;
  isOpen: boolean;
  participantsGoal: number;
  reviewsGoal: number;
  startDate: string;
  teamManager: string;
};

const createMapathonEndpoint = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.mutation<MapathonResponse, MapathonPayload>({
    query: (data) => ({
      url: `events`,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["venue"],
    transformResponse: (response: any): MapathonResponse => ({
      ...response,
      id: response.id || response._id,
    }),
  });

export type MapathonResponse = {
  id: string;
  general: string;
};

export default createMapathonEndpoint;
