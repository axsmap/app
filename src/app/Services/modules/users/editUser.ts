import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<User, { id: string }>({
    query: payload => ({
      url: `/users/${payload.id}`,
    }),
  })

export type User = {
  id: string
  avatar: string
  disabilities: []
  email: string
  events: Event[]
  firstName: []
  gender: string
  isSubscribed: boolean
  lastName: string
  managedEvents: []
  managedTeams: []
  reviewFieldsAmount: number
  reviewsAmount: number
  ranking: number
  showDisabilities: boolean
  showEmail: boolean
  showPhone: boolean
  teams: []
  username: string
}

export interface Event {
  id: string
  endDate: string
  name: string
  poster: string
}
