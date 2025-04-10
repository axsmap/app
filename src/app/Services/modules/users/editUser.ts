import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { EndpointBuilder } from "@reduxjs/toolkit/query";

const fetchUserQuery = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<User, { id: string }>({
    query: (payload) => ({
      url: `/users/${payload.id}`,
    }),
  });

export default fetchUserQuery;

export type User = {
  id: string;
  avatar: string;
  disabilities: [];
  email: string;
  events: Event[];
  firstName: [];
  gender: string;
  isSubscribed: boolean;
  lastName: string;
  managedEvents: [];
  managedTeams: [];
  reviewFieldsAmount: number;
  reviewsAmount: number;
  ranking: number;
  showDisabilities: boolean;
  showEmail: boolean;
  showPhone: boolean;
  teams: [];
  username: string;
};

export interface Event {
  id: string;
  endDate: string;
  name: string;
  poster: string;
}
