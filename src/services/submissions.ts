import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  CreateSubmissionRequest,
  GetSubmissionRequest,
  SubmissionDocumentResponse,
  SubmissionResponse,
  SubmissionType,
} from '@/types/submission'
import { EmptyObject } from '@reduxjs/toolkit'
import { BaseResponse, GetDetailRequest } from '@/types/common'
import { baseQueryWithReauth } from '@/utils/api'

const api = createApi({
  reducerPath: 'submissions',
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  tagTypes: ['Submissions'],
  endpoints: (builder) => ({
    createSubmission: builder.mutation<SubmissionResponse, CreateSubmissionRequest>({
      query: (body) => ({
        method: 'POST',
        url: 'http://localhost:3001/submissions',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
    }),
    uploadFrs: builder.mutation<SubmissionResponse, FormData>({
      query: (body) => ({
        method: 'POST',
        url: '/submission/upload/frs',
        body,
      }),
      invalidatesTags: ['Submissions'],
    }),
    uploadTranscript: builder.mutation<SubmissionResponse, FormData>({
      query: (body) => {
        return {
          method: 'POST',
          url: '/submission/upload/transcript',
          body,
        }
      },
      invalidatesTags: ['Submissions'],
    }),
    getMyDocuments: builder.query<BaseResponse<SubmissionDocumentResponse[]>, EmptyObject>({
      query: () => ({
        method: 'GET',
        url: '/submission/documents',
      }),
      providesTags: ['Submissions'],
    }),
    getSubmissions: builder.query<BaseResponse<SubmissionType[]>, GetSubmissionRequest>({
      query: (data) => ({
        method: 'GET',
        url: 'http://localhost:3001/submissions',
        params: data.params,
      }),
      providesTags: ['Submissions'],
    }),
    getSumbissionDetail: builder.query<BaseResponse<SubmissionType>, GetDetailRequest>({
      query: (data) => ({
        method: 'GET',
        url: `http://localhost:3001/submissions/${data.xid}`,
      }),
    }),
  }),
})

export const {
  useCreateSubmissionMutation,
  useUploadFrsMutation,
  useUploadTranscriptMutation,
  useLazyGetMyDocumentsQuery,
  useLazyGetSubmissionsQuery,
  useGetSumbissionDetailQuery,
} = api

export default api
