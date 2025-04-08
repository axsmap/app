import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<User, string>({
    query: payload => ({
      url: `users/profile`,
    }),
  })

export type User = {
  id: string
  avatar: string
  description: string | null
  race: string
  disability: string
  birthday: string
  disabilities: []
  email: string
  events: Event[]
  firstName: string
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
