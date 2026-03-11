import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { EndpointBuilder } from "@reduxjs/toolkit/query";

export interface EventDetailsResponse {
  id: string;
  name: string;
  description: string;
  location: {
    coordinates: [number, number];
  };
  startingPoint: string;
  donationEnabled: boolean;
  donationAmounts: { value: number }[];
  donationGoal: number;
  donationAmountRaised: number;
  donationDonorsCount: number;
  endDate: string;
  isOpen: boolean;
  participantsGoal: number;
  reviewsGoal: number;
  startDate: string;
  teamManager: string;
  address: string;
  reviewsAmount: number;
  ranking: number;
  status?: string;
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }>;
  managers: Array<{
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }>;
  eventName: string;
  eventLocation: string;
  mapUrl: string;
  reviewCount: number;
}

const eventDetails = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<EventDetailsResponse, string>({
    query: (id) => ({
      url: `events/${id}`,
    }),
    keepUnusedDataFor: 0,
    providesTags: ["venue"],
  });

export default eventDetails;
