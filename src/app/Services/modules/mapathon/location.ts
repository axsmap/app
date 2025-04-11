import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

export interface LocationSearchPayload {
  search: string;
}

export interface LocationResponse {
  predictions: Array<{ description: string; place_id: string }>;
  status: string;
}

const location = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<LocationResponse, LocationSearchPayload>({
    query: ({ search }: LocationSearchPayload) => ({
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
      params: {
        key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        input: search,
        types: "geocode",
      },
    }),
  });

export default location;
