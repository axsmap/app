import { EndpointBuilder, BaseQueryFn } from "@reduxjs/toolkit/query";

const resetPasswordMutation = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.mutation<Response, ResetPasswordPayload>({
    query: (data) => ({
      url: `auth/reset-password`,
      method: "PUT",
      body: data,
    }),
  });

export default resetPasswordMutation;

export type Response = {
  general: string;
};

export type ResetPasswordPayload = {
  password: string;
  key: string | null;
};
