import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) =>
  build.mutation<Response, LoginFacebookPayload>({
    query: data => ({
      url: `auth/facebook`,
      method: 'POST',
      body: data,
    }),
  })

export type Response = {
  token: string
  refreshToken: string
}

export type LoginFacebookPayload = {
  code: string
}
