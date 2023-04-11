import { createApi } from '@reduxjs/toolkit/query/react'

import { ProgramStudyListRequest, ProgramStudyResponse } from '@/types/program-study'
import { apiBaseQuery } from '@/utils/api'

const api = createApi({
  reducerPath: 'program-study',
  baseQuery: apiBaseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ['ProgramStudy'],
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    listProgramStudy: builder.query<ProgramStudyResponse, ProgramStudyListRequest>({
      query: (params) => ({
        params,
        url: '/public/study-program',
      }),
      providesTags: ['ProgramStudy'],
    }),
  }),
})

export const { useLazyListProgramStudyQuery } = api

export default api
