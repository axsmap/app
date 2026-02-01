import fetchOne from "./fetchOne";
import getUser, { User } from "./getUser";
import deleteUser from "./deleteUser";
import archiveUser from "./archiveUser";
import teamPhoto from "../team/teamPhoto";
import { api } from "@/Services/api";


export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchOne: fetchOne(build),
    getUser: getUser(build),
    deleteUser: deleteUser(build),
    archiveUser: archiveUser(build),
    teamPhoto: teamPhoto(build),
    getUserProfile: build.query<User, void>({
      query: () => ({
        url: `/users/profile`,
        method: "GET",
      }),
      providesTags: ["profile"],
      // Transform response to normalize _id to id
      transformResponse: (response: any): User => ({
        ...response,
        id: response.id || response._id,
      }),
    }),
    updateUser: build.mutation<User, { id: string; user: Partial<User> }>({
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
  useDeleteUserMutation,
  useArchiveUserMutation,
} = userApi;
