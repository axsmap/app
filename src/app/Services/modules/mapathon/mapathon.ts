import { EndpointBuilder } from "@reduxjs/toolkit/query";

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
  build: EndpointBuilder<MapathonResponse, MapathonPayload, string>
) =>
  build.mutation<MapathonResponse, MapathonPayload>({
    query: (data) => ({
      url: `events`,
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["venue"],
  });

export type MapathonResponse = {
  general: string;
};

export default createMapathonEndpoint;
