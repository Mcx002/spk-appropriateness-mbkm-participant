import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from '@/utils/api'
import { BaseResponse } from '@/types/common'
import { PeriodResponse } from '@/types/period'

const api = createApi({
  reducerPath: 'period',
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  tagTypes: ['Period'],
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    getOpenPeriod: builder.query<BaseResponse<PeriodResponse>, void>({
      query: () => ({
        method: 'GET',
        url: '/submission/open-period',
      }),
    }),
  }),
})

export const { useGetOpenPeriodQuery } = api

export default api
