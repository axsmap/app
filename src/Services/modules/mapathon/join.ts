import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) =>
  build.mutation<Response, Payload>({
    query: (data) => ({
      url: `events/${data.eventId}/join`,
      method: 'POST',
      body: data.userId,
    }),
  })

export type Response = {
    general: string
}

export type Payload = {
  eventId: string
  userId: string
}
