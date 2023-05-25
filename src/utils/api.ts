import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { createHash } from 'crypto'
import { DateTime } from 'luxon'
import qs from 'qs'

import { apiBaseUrl, apiClientId, apiClientName, apiClientSecret, mockBaseUrl } from '@/config/env'
import { USER_ACCESS_TOKEN, USER_ACCESS_TOKEN_EXPIRATION, USER_REFRESH_TOKEN } from '@/config/token'
import { BaseResponse } from '@/types/common'
import { AuthResponse } from '@/types/auth'
import { toast } from 'react-hot-toast'
import { message } from '@/data/wording'
import { setTokenSession } from '@/utils/auth'

export const headerPrepareAuth = (headers: Headers): void => {
  const userAccessToken =
    getCookie(USER_ACCESS_TOKEN) ??
    'eyJhbGciOiJIUzI1NiJ9.eyJ4aWQiOiI4YjFmMDU3YS01ZGI0LTU3MTEtYmQzNC0zZjMwYzE1ZWFiZjgiLCJmdWxsX25hbWUiOiJNdWNobGlzaCBDaG9lcnVkZGluIiwidXNlcl90eXBlIjoiU1RVREVOVCIsInJvbGVzIjpbIlNUVURFTlQiXSwiaWF0IjoxNjgwNzA4MTc4LCJpc3MiOiJtYmttLXdlYi1zZXJ2aWNlIiwiYXVkIjoiV0VCX0FQUCIsImV4cCI6MTY4MDcxMTc3OH0.B_BzT8YCgltYIJhpvj6cPY3gMpbxO-y9uvkNivSdN1I'
  headers.set('Authorization', `Bearer ${userAccessToken}`)
}

export const headerPrepareCredentials = (headers: Headers): void => {
  const timestamp = DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd HH:mm:ss').replace(' ', 'T')
  const sha256 = createHash('sha256')
    .update([apiClientId, apiClientSecret, timestamp].join(':').toString())
    .digest('hex')
  const hkey = sha256.substring(0, 42)

  headers.set('X-CLIENT-NAME', apiClientName ?? '')
  headers.set('X-KEY', hkey)
  headers.set('X-TIMESTAMP', timestamp)
}

export const apiBaseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  paramsSerializer: (params) => qs.stringify(params),
  prepareHeaders: (headers) => {
    headerPrepareAuth(headers)
    headerPrepareCredentials(headers)
    return headers
  },
})

export const mockBaseQuery = fetchBaseQuery({
  baseUrl: mockBaseUrl,
  paramsSerializer: (params) => qs.stringify(params),
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await apiBaseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshToken = getCookie(USER_REFRESH_TOKEN)
    if (!refreshToken) {
      logout()
    }

    // try to get a new token
    const headers: Headers = new Headers()
    headerPrepareAuth(headers)
    headerPrepareCredentials(headers)
    headers.set('Content-Type', 'application/json')
    const refreshResult = await fetch(`${apiBaseUrl}/auth/refresh-token`, {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
      headers: headers,
    })

    const data: AuthResponse = await refreshResult.json()
    setTokenSession({
      accessToken: data.result.token,
      refreshToken: data.result.refresh_token,
      refreshTokenLifetime: data.result.refresh_token_lifetime,
    })

    if (!data) {
      logout()
    }
    // retry the initial query
    result = await apiBaseQuery(args, api, extraOptions)
  }
  return result
}

const logout = () => {
  toast.error(message.sessionExpired)
  deleteCookie(USER_ACCESS_TOKEN)
  deleteCookie(USER_REFRESH_TOKEN)
  deleteCookie(USER_ACCESS_TOKEN_EXPIRATION)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.location = '/login'
}
