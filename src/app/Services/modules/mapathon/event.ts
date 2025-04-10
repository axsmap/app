import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const createEventQuery = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.query<EventProps, EventPayload>({
    query: (payload) => ({
      url: `events?keywords=${payload.keywords}`,
    }),
    keepUnusedDataFor: 0,
  });

type EventProps = { id: string; name: string };

type EventPayload = {
  keywords: string;
  page?: number;
};

export default createEventQuery;
