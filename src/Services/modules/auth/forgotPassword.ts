import { EndpointBuilder, BaseQueryFn } from '@reduxjs/toolkit/query'

const forgotPasswordMutation = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<Response, ForgotPayload>({
    query: data => ({
      url: `auth/forgotten-password`,
      method: 'POST',
      body: data,
    }),
  });

export default forgotPasswordMutation;

export type Response = {
  general: string
}

export type ForgotPayload = {
  email: string
}
