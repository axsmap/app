import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const upcomingEventsQuery = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.query<EventProps, {}>({
    query: () => ({
      url: `events/joinedEvents`,
    }),
  });

export default upcomingEventsQuery;

export interface mapathon {
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
}

type EventProps = { results: mapathon[] };
