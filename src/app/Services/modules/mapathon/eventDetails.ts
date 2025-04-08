import { EventDetailsPayload, EventDetailsProps } from '@/Documents/types'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) =>
    build.query<EventDetailsProps, EventDetailsPayload>({
        query: payload => ({
            url: `events/${payload.id}`,
        }),
    })