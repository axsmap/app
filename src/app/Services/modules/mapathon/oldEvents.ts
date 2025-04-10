import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const oldEventsQuery = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<EventProps, void>({
    query: () => ({
      url: `events/old`,
    }),
  });

export default oldEventsQuery;

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
