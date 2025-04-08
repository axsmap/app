import { ReviewPayload, ReviewResponse } from '@/Documents/types'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) =>
  build.mutation<ReviewResponse, ReviewPayload>({
    query: data => ({
      url: `reviews`,
      method: 'POST',
      body: data,
    }),
    invalidatesTags: ['venue'],
  })
