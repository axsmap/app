import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const loginWithFacebook = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.mutation<Response, LoginFacebookPayload>({
    query: (data) => ({
      url: `auth/facebook`,
      method: "POST",
      body: data,
    }),
  });

export default loginWithFacebook;

export type Response = {
  token: string;
  refreshToken: string;
};

export type LoginFacebookPayload = {
  code: string;
};
