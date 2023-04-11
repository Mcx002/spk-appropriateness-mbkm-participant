import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { getCookie } from 'cookies-next'
import { createHash } from 'crypto'
import { DateTime } from 'luxon'
import qs from 'qs'

import { apiBaseUrl, apiClientId, apiClientName, apiClientSecret } from '@/config/env'
import { USER_ACCESS_TOKEN } from '@/config/token'

export const apiBaseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  paramsSerializer: (params) => qs.stringify(params),
  prepareHeaders: (headers) => {
    const userAccessToken =
      getCookie(USER_ACCESS_TOKEN) ??
      'eyJhbGciOiJIUzI1NiJ9.eyJ4aWQiOiI4YjFmMDU3YS01ZGI0LTU3MTEtYmQzNC0zZjMwYzE1ZWFiZjgiLCJmdWxsX25hbWUiOiJNdWNobGlzaCBDaG9lcnVkZGluIiwidXNlcl90eXBlIjoiU1RVREVOVCIsInJvbGVzIjpbIlNUVURFTlQiXSwiaWF0IjoxNjgwNzA4MTc4LCJpc3MiOiJtYmttLXdlYi1zZXJ2aWNlIiwiYXVkIjoiV0VCX0FQUCIsImV4cCI6MTY4MDcxMTc3OH0.B_BzT8YCgltYIJhpvj6cPY3gMpbxO-y9uvkNivSdN1I'
    const timestamp = DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd HH:mm:ss').replace(' ', 'T')
    const sha256 = createHash('sha256')
      .update([apiClientId, apiClientSecret, timestamp].join(':').toString())
      .digest('hex')
    const hkey = sha256.substring(0, 42)

    headers.set('X-CLIENT-NAME', apiClientName ?? '')
    headers.set('X-KEY', hkey)
    headers.set('X-TIMESTAMP', timestamp)
    headers.set('Content-Type', 'application/json')
    headers.set('Authorization', `Bearer ${userAccessToken}`)

    return headers
  },
})
