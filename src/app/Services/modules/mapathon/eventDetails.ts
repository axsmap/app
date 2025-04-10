import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const createEventDetailsQuery = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.query<EventDetailsProps, EventDetailsPayload>({
    query: (payload) => ({
      url: `events/${payload.id}`,
    }),
  });

type EventDetailsPayload = {
  id: string;
};

type EventDetailsProps = {
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

export default createEventDetailsQuery;
