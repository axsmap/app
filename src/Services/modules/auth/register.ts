import { EndpointBuilder, BaseQueryFn } from "@reduxjs/toolkit/query";

const registerMutation = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.mutation<Response, RegisterPayload>({
    query: (data) => ({
      url: `auth/sign-up`,
      method: "POST",
      body: data,
    }),
  });

export default registerMutation;

export type Response = {
  general: string;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isSubscribed: boolean;
  dateOfBirth:string;
  disability: string;
  race: string;
  aboutMe: string;
  gender: string;
};
