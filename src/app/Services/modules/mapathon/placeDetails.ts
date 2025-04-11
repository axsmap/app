import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

interface PlaceDetailsResponse {
  result: {
    name: string;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  };
  status: string;
}

const placeDetails = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<PlaceDetailsResponse, string>({
    query: (placeId: string) => ({
      url: `https://maps.googleapis.com/maps/api/place/details/json`,
      params: {
        key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        place_id: placeId,
      },
    }),
  });

export default placeDetails;
