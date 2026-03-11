import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const upcomingEventsQuery = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.query<EventResponse, upcomingEventsPayload>({
    query: (params) => ({
      url: `events/upComing`,
      params: {
        page: params?.page,
        pageLimit: params?.limit,
      },
    }),
  });

export default upcomingEventsQuery;

type upcomingEventsPayload = {
  page?: number;
  limit?: number;
};
export type EventType = {
  id: string;
  name: string;
  location: {coordinates: [number, number]};
  startDate: string;
  endDate: string;
  mapUrl: string;
  reviewCount: number;
  reviewsGoal: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  reviewsAmount: number;
  mapathonId: string;
  eventId: string;
  eventName: string;
  eventLocation: string;
  address: string;
  status?: "draft" | "active" | "closed";
};

export type EventResponse = {
  results: EventType[];
  total:number
};
