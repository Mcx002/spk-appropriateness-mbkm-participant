import { getCookie, setCookie } from 'cookies-next'
import { DateTime } from 'luxon'

import { USER_ACCESS_TOKEN, USER_ACCESS_TOKEN_EXPIRATION, USER_REFRESH_TOKEN } from '@/config/token'
import { decodeJwtToken } from '@/utils/jwt'

export type TokenSession = {
  accessToken: string
  refreshToken: string
  refreshTokenLifetime: number
}

export enum UserRole {
  Student = 'STUDENT',
  Lecture = 'LECTURE',
}

export type UserSession = {
  name: string
  email: string
  nim: string
  role: UserRole
}

const defaultAccessTokenLifetime = 3600
const defaultExpiration = DateTime.now().plus({ seconds: defaultAccessTokenLifetime }).toJSDate()

const toUserRole = (role: string) => {
  switch (role) {
    case 'STUDENT':
      return UserRole.Student
    case 'LECTURE':
      return UserRole.Lecture
  }

  return UserRole.Student
}
export const setTokenSession = ({ accessToken, refreshToken, refreshTokenLifetime }: TokenSession) => {
  setCookie(USER_ACCESS_TOKEN, accessToken)
  setCookie(USER_ACCESS_TOKEN_EXPIRATION, accessToken, { expires: defaultExpiration })
  setCookie(USER_REFRESH_TOKEN, refreshToken, { expires: DateTime.fromSeconds(refreshTokenLifetime).toJSDate() })
}

export const getUserSession = (): UserSession | null => {
  const cdata = getCookie(USER_ACCESS_TOKEN)
  if (!cdata) {
    return null
  }
  const { payload } = decodeJwtToken(cdata as string)
  return {
    name: payload.name,
    email: payload.email,
    nim: payload.additional_info.identifier_id,
    role: toUserRole(payload.user_type),
  }
}
