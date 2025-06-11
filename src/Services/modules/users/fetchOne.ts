import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

const fetchOneUser = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<User, string>({
    query: (id) => `/users/${id}`,
  });

export default fetchOneUser;

export type User = {
  id: string;
  avatar: string;
  description: string | null;
  race: string;
  disability: string;
  birthday: string;
  disabilities: [];
  email: string;
  events: Event[];
  firstName: string;
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
