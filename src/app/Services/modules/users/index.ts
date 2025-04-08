import { api } from '@/Services/api'
import fetchOne, { UserOne } from './fetchOne'
import getUser, { User } from './getUser'
import editUser from './editUser'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    fetchOne: fetchOne(build),
    getUser: getUser(build),
    getUserProfile: build.query<User, void>({
      query: () => ({
        url: `/users/profile`,
        method: 'GET',
      }),
      providesTags: ['profile'],
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
    updateUser: build.mutation<User, { userId: string; user: User }>({
      query: ({ userId, user }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['profile'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useFetchOneQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useLazyGetUserProfileQuery,
  useUpdateUserMutation,
} = userApi
