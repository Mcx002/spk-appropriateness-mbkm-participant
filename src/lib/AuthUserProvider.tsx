import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { DateTime } from 'luxon'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN, USER_ACCESS_TOKEN_EXPIRATION } from '@/config/token'
import { useRefreshTokenMutation } from '@/services/auth'

import { AuthAppContextValue, AuthStatus } from './auth/types'
import { AuthUserContext } from './AuthContext'
import { useUpdateEffect } from 'usehooks-ts'
import authRouting from '@/config/authRouting'
import { setTokenSession } from '@/utils/auth'

interface AuthProviderProps {
  children: React.ReactNode
  baseUrl: string
  cookieName: string
  myProfileUrl?: string
  refetchInterval?: number
}

const UserAppProvider: FC<AuthProviderProps> = ({ children, cookieName }) => {
  const router = useRouter()
  const [hasAppAccessToken] = useState(() => !!getCookie(cookieName))
  const [refreshTokenRequest, { error, data, isSuccess }] = useRefreshTokenMutation()
  const [isRefreshToken, setRefreshToken] = useState(false)

  useEffect(() => {
    if (!authRouting.includes(router.pathname)) {
      const token = getCookie(cookieName)
      const expiration = getCookie(USER_ACCESS_TOKEN_EXPIRATION)
      const refreshToken = getCookie(USER_REFRESH_TOKEN)

      if (!token && !refreshToken) {
        router.push('/login')
      }

      if (!expiration) {
        setRefreshToken(true)
      }
    }
  }, [router.pathname])

  useUpdateEffect(() => {
    const refreshToken = getCookie(USER_REFRESH_TOKEN)
    if (isRefreshToken) {
      refreshTokenRequest({ body: { refresh_token: refreshToken?.toString() ?? '' } })
    }
  }, [isRefreshToken])

  useEffect(() => {
    if (isSuccess && data) {
      setTokenSession({
        accessToken: data.result.token,
        refreshToken: data.result.refresh_token,
        refreshTokenLifetime: data.result.refresh_token_lifetime,
      })
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (error) {
      deleteCookie(USER_ACCESS_TOKEN)
      deleteCookie(USER_ACCESS_TOKEN_EXPIRATION)
      deleteCookie(USER_REFRESH_TOKEN)
      toast.error('Gagal merefresh token, kamu akan diarahkan ke halaman login')
      router.push('/login')
    }
  }, [error])

  const value: AuthAppContextValue = useMemo(
    () => ({
      status: hasAppAccessToken ? AuthStatus.Authenticated : AuthStatus.Unauthenticated,
    }),
    [hasAppAccessToken]
  )

  return <AuthUserContext.Provider value={value}>{children}</AuthUserContext.Provider>
}

export default UserAppProvider
