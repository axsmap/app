import { EndpointBuilder } from "@reduxjs/toolkit/query";


export default (build: EndpointBuilder<any, any, any>) =>
  build.mutation<Response, Payload>({
    query: (data: Payload) => ({
      url: "reviews/create",
      method: "POST",
      body: data,
    }),
  });

export type Response = {
  general: string;
  data: string;
};

export type Payload = Record<string, any>;
