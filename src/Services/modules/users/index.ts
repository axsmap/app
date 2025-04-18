import fetchOne from "./fetchOne";
import getUser, { User } from "./getUser";
import teamPhoto from "../team/teamPhoto";
import { api } from "@/Services/api";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchOne: fetchOne(build),
    getUser: getUser(build),
    teamPhoto: teamPhoto(build),
    getUserProfile: build.query<User, void>({
      query: () => ({
        url: `/users/profile`,
        method: "GET",
      }),
      providesTags: ["profile"],
      // async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
      //   // get a random user
      //   const randomResult = await fetchWithBQ('users/profile')
      //   if (randomResult.error) throw randomResult.error
      //   const user = randomResult.data as User
      //   const result = await fetchWithBQ(`/users/${user.id}`)
      //   return result.data
      //     ? { data: result.data as User }
      //     : { error: result.error as FetchBaseQueryError }
      // },
    }),
    updateUser: build.mutation<User, { id: string; user: User }>({
      query: ({ id, user }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useFetchOneQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useLazyGetUserProfileQuery,
  useTeamPhotoMutation,
  useUpdateUserMutation,
} = userApi;
