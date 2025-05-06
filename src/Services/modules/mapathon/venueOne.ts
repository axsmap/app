import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

export type VenueOneResult = {
  placeId: string;
  name: string;
  coverPhoto: string;
  description: string;
  formattedPhone: string;
  website: string;
  address: string;
  internationalPhone: string;
  reviews: {
    authorName: string;
    rating: number;
    text: string;
    time: number;
  };
};

const createVenueOneQuery = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.query<VenueOneResult, VenueProps>({
    query: (payload) => ({
      url: `venues/${payload.placeId}`,
    }),
  });

export type VenueProps = {
  placeId: string;
};

export default createVenueOneQuery;
