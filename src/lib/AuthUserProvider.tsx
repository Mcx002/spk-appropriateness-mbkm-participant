import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useMemo, useState } from 'react'

import { AuthAppContextValue, AuthStatus } from './auth/types'
import { AuthUserContext } from './AuthContext'

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

  useEffect(() => {
    if (!getCookie(cookieName)) {
      router.push('/login')
    }
  }, [])

  const value: AuthAppContextValue = useMemo(
    () => ({
      status: hasAppAccessToken ? AuthStatus.Authenticated : AuthStatus.Unauthenticated,
    }),
    [hasAppAccessToken]
  )

  return <AuthUserContext.Provider value={value}>{children}</AuthUserContext.Provider>
}

export default UserAppProvider
