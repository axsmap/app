import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { EndpointBuilder } from "@reduxjs/toolkit/query";

const getUserQuery = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<User, void>({
    query: () => ({
      url: `users/profile`,
    }),
  });

export default getUserQuery;

export type User = {
  id: string;
  avatar: string;
  aboutMe: string | null;
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

export interface Event {
  id: string;
  endDate: string;
  name: string;
  poster: string;
}
