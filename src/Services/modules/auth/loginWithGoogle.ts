import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const loginWithGoogle = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<Response, LoginGooglePayload>({
    query: (data) => ({
      url: `auth/google`,
      method: "POST",
      body: data,
    }),
  });

export default loginWithGoogle;

export type Response = {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    email: string;
  };
};

export type LoginGooglePayload = {
  code: string;
};
