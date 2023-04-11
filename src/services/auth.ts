import { createApi } from '@reduxjs/toolkit/query/react'

import { AuthResponse, LoginRequest, RefreshTokenRequest, RegisterRequest } from '@/types/auth'
import { apiBaseQuery } from '@/utils/api'

const api = createApi({
  reducerPath: 'auth',
  baseQuery: apiBaseQuery,
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: ({ body }) => ({
        method: 'POST',
        url: '/auth/register',
        body,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: ({ body }) => ({
        method: 'POST',
        url: '/auth/authorize',
        body,
      }),
    }),
    refreshToken: builder.mutation<AuthResponse, RefreshTokenRequest>({
      query: ({ body }) => ({
        method: 'POST',
        url: '/auth/refresh-token',
        body,
      }),
    }),
  }),
})

export const { useRegisterMutation, useLoginMutation, useRefreshTokenMutation, util: authUtil } = api

export default api
