import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

export type VenueOneResult = {
  axsReviews: [
    {
      authorName: string;
      rating: number;
      comment: string;
      text: string;
      time: number;
    }
  ];
  googleData: {
    name: string;
    formatted_address: string;
    placeId: string;
    vicinity: string;
    rating: number;
    userRatingsTotal: number;
    photos: [
      {
        height: number;
        width: number;
        photoReference: string;
      }
    ];
  };
};

const createVenueOneQuery = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.query<VenueOneResult, VenueProps>({
    query: (payload) => ({
      url: `venues/detail/${payload.placeId}`,
    }),
  });

export type VenueProps = {
  placeId: string;
};

export default createVenueOneQuery;
