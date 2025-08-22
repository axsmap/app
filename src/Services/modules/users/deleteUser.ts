import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { EndpointBuilder } from "@reduxjs/toolkit/query";

const deleteUserQuery = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<void, string>({
    query: (id) => ({
      url: `users/${id}`,
      method: 'DELETE',
    }),
  });

export default deleteUserQuery;