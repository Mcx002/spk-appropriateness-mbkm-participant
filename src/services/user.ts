import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

import { BaseResponse } from '@/types/common'
import { User } from '@/types/user'

const api = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http:',
  }),

  keepUnusedDataFor: 259200,
  endpoints: (builder) => ({
    getProfile: builder.query<BaseResponse<User>, void>({
      query: () => ({
        method: 'GET',
        url: '//localhost:3001/users/profile',
      }),
    }),
  }),
})

export const { useGetProfileQuery, useLazyGetProfileQuery } = api

export default api
