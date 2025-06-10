import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

export type VenueOneResult = {
  axsReviews:   {
    authorName: string;
    rating: number;
    comment: string;
    text: string;
    time: number;
  }[];
  googleData: GoogleData
};

export type VenueOneResponse= {
  data: VenueOneResult;
};

export interface GoogleReview {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}

export interface OpeningHoursPeriod {
  close: {
    day: number;
    time: string;
  };
  open: {
    day: number;
    time: string;
  };
}

export interface OpeningHours {
  open_now: boolean;
  periods: OpeningHoursPeriod[];
  weekday_text: string[];
}

export interface Viewport {
  northeast: {
    lat: number;
    lng: number;
  };
  southwest: {
    lat: number;
    lng: number;
  };
}

export interface photos {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

export interface Geometry {
  location: {
    lat: number;
    lng: number;
  };
  viewport: Viewport;
}

export interface GoogleData {
  formatted_address: string;
  geometry: Geometry;
  name: string;
  photo: string;
  photos: photos[];
  international_phone_number:string;
  opening_hours: OpeningHours;
  rating: number;
  reviews: GoogleReview[];
  user_ratings_total: number;
  website: string;
}


const createVenueOneQuery = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.query<VenueOneResponse, VenueProps>({
    query: (payload) => ({
      url: `venues/detail/${payload.placeId}`,
    }),
  });

export type VenueProps = {
  placeId: string;
};

export default createVenueOneQuery;
