import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { BaseResponse } from '@/types/common'
import { GetPeriodRequest, GetSpkResultRequest, PeriodDto, SpkResponse } from '@/types/period'
import { baseQueryWithReauth } from '@/utils/api'

const api = createApi({
  reducerPath: 'period',
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  tagTypes: ['Period'],
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    getOpenPeriod: builder.query<BaseResponse<PeriodDto>, void>({
      query: () => ({
        method: 'GET',
        url: '/submission/open-period',
      }),
    }),
    getListPeriod: builder.query<BaseResponse<PeriodDto[]>, GetPeriodRequest>({
      query: ({ params }) => ({
        method: 'GET',
        url: '/submission-period',
        params,
      }),
    }),
    savePeriod: builder.mutation<BaseResponse<PeriodDto>, FormData>({
      query: (formData) => ({
        method: 'POST',
        url: '/submission-period',
        body: formData,
      }),
    }),
    updatePeriod: builder.mutation<BaseResponse<PeriodDto>, FormData>({
      query: (formData) => ({
        method: 'PUT',
        url: '/submission-period',
        body: formData,
      }),
    }),
    getSpkResult: builder.query<BaseResponse<SpkResponse[]>, GetSpkResultRequest>({
      query: (data) => ({
        method: 'GET',
        url: `/submission/spk-result/${data.periodId}`,
        params: data.params,
      }),
    }),
    getDetailPeriod: builder.query<BaseResponse<PeriodDto>, string>({
      query: (id) => ({
        method: 'GET',
        url: `/submission-period/${id}`,
      }),
    }),
    postEligible: builder.mutation<BaseResponse<null>, FormData>({
      query: (formData) => ({
        method: 'POST',
        url: '/submission/eligible',
        body: formData,
      }),
    }),
  }),
})

export const {
  useGetOpenPeriodQuery,
  useLazyGetListPeriodQuery,
  useSavePeriodMutation,
  useUpdatePeriodMutation,
  useLazyGetSpkResultQuery,
  useLazyGetDetailPeriodQuery,
  usePostEligibleMutation,
} = api

export default api
