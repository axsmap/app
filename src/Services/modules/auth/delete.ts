import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query'

const deleteUserMutation = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<null, boolean>({
    query: () => ({
      url: `users/deactivate`,
      method: 'DELETE',
    }),
  });

export default deleteUserMutation;
