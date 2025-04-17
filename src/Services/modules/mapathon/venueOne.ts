import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

export type VenueOneResult = {
  name: string;
  address: string;
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
