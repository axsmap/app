import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { EndpointBuilder } from "@reduxjs/toolkit/query";

const archiveUserQuery = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<void, string>({
    query: (userId) => ({
      url: `users/${userId}/archive`,
      method: 'PUT',
    }),
  });

export default archiveUserQuery;