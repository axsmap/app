import { EventPayload, EventProps } from '@/Documents/types'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<EventProps, EventPayload>({
    query: payload => ({
      url: `events?keywords=${payload.keywords}`,
    }),
    keepUnusedDataFor: 0,
  })
