import { createApi } from '@reduxjs/toolkit/query/react'

import {
  CreateSubmissionRequest,
  GetDetailSubmissionResponse,
  GetMySubmissionRequest,
  GetSubmissionRequest,
  GetSubmissionResponse,
  SubmissionDocumentResponse,
  SubmissionResponse,
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
        url: '/documents/upload-frs',
        body,
      }),
      invalidatesTags: ['Submissions'],
    }),
    uploadTranscript: builder.mutation<SubmissionResponse, FormData>({
      query: (body) => {
        return {
          method: 'POST',
          url: '/documents/upload-transcript',
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
    getMySubmissions: builder.query<BaseResponse<GetSubmissionResponse[]>, GetMySubmissionRequest>({
      query: (data) => ({
        method: 'GET',
        url: '/submission/my-submissions',
        params: data.params,
      }),
      providesTags: ['Submissions'],
    }),
    getSubmissionDetail: builder.query<BaseResponse<GetDetailSubmissionResponse>, GetDetailRequest>({
      query: (data) => ({
        method: 'GET',
        url: `/submission/detail/${data.xid}`,
      }),
    }),
    saveSubmissionProfile: builder.mutation<BaseResponse<GetSubmissionResponse>, FormData>({
      query: (body) => {
        return {
          method: 'POST',
          url: '/submission/save-basic-data',
          body,
        }
      },
      invalidatesTags: ['Submissions'],
    }),
    saveSubmissionGrade: builder.mutation<BaseResponse<GetSubmissionResponse>, FormData>({
      query: (body) => {
        return {
          method: 'POST',
          url: '/submission/save-grade',
          body,
        }
      },
      invalidatesTags: ['Submissions'],
    }),
    submitSubmission: builder.mutation<BaseResponse<GetSubmissionResponse>, FormData>({
      query: (body) => {
        return {
          method: 'POST',
          url: '/submission/submit',
          body,
        }
      },
      invalidatesTags: ['Submissions'],
    }),
    getSubmissions: builder.query<BaseResponse<GetSubmissionResponse[]>, GetSubmissionRequest>({
      query: (data) => ({
        method: 'GET',
        url: '/submission',
        params: data.params,
      }),
      providesTags: ['Submissions'],
    }),
  }),
})

export const {
  useCreateSubmissionMutation,
  useUploadFrsMutation,
  useUploadTranscriptMutation,
  useLazyGetMyDocumentsQuery,
  useLazyGetMySubmissionsQuery,
  useLazyGetSubmissionDetailQuery,
  useSaveSubmissionProfileMutation,
  useSaveSubmissionGradeMutation,
  useSubmitSubmissionMutation,
  useLazyGetSubmissionsQuery,
} = api

export default api
