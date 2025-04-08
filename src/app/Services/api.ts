import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { isEmpty } from "lodash";

const baseQuery = fetchBaseQuery({
  // baseUrl: 'https://api.axsmap.com',
  baseUrl: "https://test-api.edvizi.net/",
  prepareHeaders: (headers: any, { getState }) => {
    const token = (getState() as any).token.token;
    console.log(token);
    if (!isEmpty(token)) {
      headers.set("Authorization", `Bearer ${token.token}`);
    }

    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    console.log("token expired");
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  tagTypes: ["venue", "profile"],
});
