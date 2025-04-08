import { MapathonPayload, MapathonResponse } from '@/Documents/types'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) =>
  build.mutation<MapathonResponse, MapathonPayload>({
    query: data => ({
      url: `events`,
      method: 'POST',
      body: data,
    }),
    invalidatesTags: ['venue'],
  })
