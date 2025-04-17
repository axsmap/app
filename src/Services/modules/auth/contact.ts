import { EndpointBuilder, BaseQueryFn } from "@reduxjs/toolkit/query";

const contactUsMutation = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.mutation<Response, ContactUsPayload>({
    query: (data) => ({
      url: `contact`,
      method: "POST",
      body: data,
    }),
  });

export default contactUsMutation;

export type Response = {
  general: string;
};

export type ContactUsPayload = {
  email: string;
  name: string;
  message: sring;
};
