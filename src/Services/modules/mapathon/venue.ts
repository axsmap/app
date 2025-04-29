import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

type Venues = {
  id: string;
  name: string;
  location: string;
  type: string;
};

type Payload = {
  location: string;
  name: string;
  type: string;
  page: string;
};

export const venue = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<Venues, Payload>({
    query: (payload) => {
      let url = `venues?location=${payload.location}&name=${payload.name}&type=${payload.type}&page=${payload.page}`;
      return {
        url,
      };
    },
  });
