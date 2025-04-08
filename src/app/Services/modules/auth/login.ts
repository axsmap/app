import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const loginMutation = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<Response, LoginPayload>({
    query: (data) => ({
      url: `auth/sign-in`,
      method: "POST",
      body: data,
    }),
  });

export default loginMutation;

export type Response = {
  token: string;
  refreshToken: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type remeberMe = LoginPayload & {
  rememberMe: boolean;
};
