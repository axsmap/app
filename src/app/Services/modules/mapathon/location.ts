import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const location = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<LocationProps, LocationPayload>({
    query: ({ search }: LocationPayload) => ({
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
      params: {
        key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        input: search,
        types: "geocode",
      },
    }),
    keepUnusedDataFor: 0,
  });

type LocationPayload = {
  search: string;
};
type Prediction = {
  description: string;
  place_id: string;
};

type LocationProps = {
  predictions: Prediction[];
  status: string;
};

export default location;
