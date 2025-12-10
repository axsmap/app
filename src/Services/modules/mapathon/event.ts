import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { EventResponse } from "./upcomingEvents";

const createEventQuery = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.query<EventResponse, EventPayload>({
    query: (payload) => ({
      url: `events`,
      params: {
        keywords: payload.keywords,
        page: payload.page,
        pageLimit: payload.limit,
      },
    }),
    keepUnusedDataFor: 0,
  });


type EventPayload = {
  keywords: string;
  page?: number;
  limit?: number;
};

export default createEventQuery;
