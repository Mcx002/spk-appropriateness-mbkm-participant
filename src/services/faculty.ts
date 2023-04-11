import { createApi } from '@reduxjs/toolkit/query/react'

import { FacultyListRequest, FacultyResponse } from '@/types/faculty'
import { apiBaseQuery } from '@/utils/api'

const api = createApi({
  reducerPath: 'faculty',
  baseQuery: apiBaseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ['Faculty'],
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    listFaculty: builder.query<FacultyResponse, FacultyListRequest>({
      query: (params) => ({
        params,
        url: '/public/faculty',
      }),
      providesTags: ['Faculty'],
    }),
  }),
})

export const { useLazyListFacultyQuery } = api

export default api
