import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { EventResponse } from "./upcomingEvents";

const oldEventsQuery = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<EventResponse, OldEventPayload>({
    query: (params) => ({
      url: `events/old`,
      params: {
        page: params.page,
        pageLimit: params.limit,
      },
    }),
  });

export default oldEventsQuery;

type OldEventPayload = {
  page: number;
  limit?: number;
};

