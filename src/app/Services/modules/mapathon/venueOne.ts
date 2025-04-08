import { VenueOneResult, VenueProps } from '@/Documents/types'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<VenueOneResult, VenueProps>({
    query: payload => ({
      url: `venues/${payload.placeId}`,
    }),
  })
