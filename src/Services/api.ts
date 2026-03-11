import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { clearToken } from "@/Store/Auth/tokenSlice";
import { clearUser } from "@/Store/Auth/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  // baseUrl: "http://localhost:8001",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { token: { token: string } }).token.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("x-device-type", "web");
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const token = (api.getState() as { token: { token: string } }).token.token;

    if (token) {
      // Token exists but is expired/invalid — clear it
      api.dispatch(clearToken());
      api.dispatch(clearUser());

      // Retry the request without the (now cleared) token
      // This allows public endpoints (teams, venues) to succeed for guest users
      result = await baseQuery(args, api, extraOptions);
    }
    // If no token existed, this is just a guest hitting an auth-required
    // endpoint — return the 401 error as-is without retrying
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  tagTypes: ["venue", "profile", "team"],
});
