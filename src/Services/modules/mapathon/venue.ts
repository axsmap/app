import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

type Venues = {
  id: string;
  name: string;
  location: string;
  type: string;
  // entranceScore: string;
  // interiorScore: string;
  // restroomScore: string;
  // language: string;
  // hasParking: boolean;
};

type Payload = {
  location: string;
  name: string;
  type: string;
  page: string;
  // entranceScore: string;
  // interiorScore: string;
  // restroomScore: string;
  // language: string;
  // hasParking: string;
};

export const venue = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<Venues, Payload>({
    query: (payload) => {
      let url = `venues?location=${payload.location}&name=${payload.name}&type=${payload.type}&page=${payload.page}`;

      // if (payload.entranceScore !== "any") {
      //   url += `&entranceScore=${payload.entranceScore}`;
      // }
      // if (payload.interiorScore !== "any") {
      //   url += `&interiorScore=${payload.interiorScore}`;
      // }
      // if (payload.restroomScore !== "any") {
      //   url += `&restroomScore=${payload.restroomScore}`;
      // }
      // if (payload.language !== "") {
      //   url += `&language=${payload.language}`;
      // }
      // if (payload.hasParking !== "any") {
      //   url += `&hasParking=${payload.hasParking}`;
      // }
      return {
        url,
      };
    },
  });
