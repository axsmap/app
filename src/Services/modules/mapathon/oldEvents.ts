import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { EventResponse } from "./upcomingEvents";

const oldEventsQuery = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<EventResponse, OldEventPayload>({
    query: (params) => ({
      url: `events/old`,
      params: {
        page: params.page,
        limit: params.limit,
      },
    }),
  });

export default oldEventsQuery;

type OldEventPayload = {
  page: number;
  limit?: number;
};

