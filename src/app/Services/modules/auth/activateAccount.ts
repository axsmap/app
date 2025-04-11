import { EndpointBuilder, BaseQueryFn } from "@reduxjs/toolkit/query";

const activateAccount = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<Response, string>({
    query: (key) => ({
      url: `/auth/activate-account/${key}`,
    }),
  });

export default activateAccount;

export type Response = {
  general: string;
};
