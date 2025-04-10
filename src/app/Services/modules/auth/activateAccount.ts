import { EndpointBuilder, BaseQueryFn } from "@reduxjs/toolkit/query";

const activateAccountMutation = (
  build: EndpointBuilder<BaseQueryFn, string, string>
) =>
  build.query<Response, string>({
    query: (key) => ({
      url: `/auth/activate-account/${key}`,
      method: "GET",
    }),
  });

export default activateAccountMutation;

export type Response = {
  general: string;
};
