import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const oldEventsQuery = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<EventProps, OldEventPayload>({
    query: () => ({
      url: `events/old`,
    }),
  });

export default oldEventsQuery;

type OldEventPayload = {
  page: number;
  limit?: number;
};
type EventProps = {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  mapUrl: string;
  reviewCount: number;
  reviewsGoal: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  mapathonId: string;
  eventId: string;
  eventName: string;
  eventLocation: string;
  address: string;
};
