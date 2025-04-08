import { Payload, Venues } from '@/Documents/types'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<Venues, Payload>({
    query: payload => {
      let url = `venues?location=${payload.lat},${payload.long}&name=${payload.name}&type=${payload.type}&page=${payload.page}`

      if (payload.entranceScore !== 'any') {
        url += `&entranceScore=${payload.entranceScore}`
      }
      if (payload.interiorScore !== 'any') {
        url += `&interiorScore=${payload.interiorScore}`
      }
      if (payload.restroomScore !== 'any') {
        url += `&restroomScore=${payload.restroomScore}`
      }
      if (payload.language !== '') {
        url += `&language=${payload.language}`
      }
      if (payload.hasParking !== 'any') {
        url += `&hasParking=${payload.hasParking}`
      }
      if (payload.allowsGuideDog !== 'any') {
        url += `&allowsGuideDog=${payload.allowsGuideDog}`
      }

      return {
        url,
      }
    },
    providesTags: ['venue'],
  })
