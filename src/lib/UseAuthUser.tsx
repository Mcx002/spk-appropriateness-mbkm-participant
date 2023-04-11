import { useRouter } from 'next/router'
import React from 'react'

import { AuthStatus, AuthUserContextValue } from './auth/types'
import { AuthUserContext } from './AuthContext'

export interface UseAuthOptions<R extends boolean> {
  required: R
  onUnauthenticated?: () => void
}

function UseAuthUser<R extends boolean>(options?: UseAuthOptions<R>) {
  const router = useRouter()

  // @ts-expect-error Satisfy TS if branch on line below
  const value: AuthUserContextValue = React.useContext(AuthUserContext)

  if (!value && process.env.NODE_ENV !== 'production') {
    throw new Error('[@nbs/next-auth]: `UseAuthUser` must be wrapped in a <AuthUserContext />')
  }

  const { required, onUnauthenticated } = options ?? {}

  const requiredAndNotLoading = required && value.status === AuthStatus.Unauthenticated
  React.useEffect(() => {
    if (requiredAndNotLoading) {
      if (onUnauthenticated) {
        onUnauthenticated()
      } else {
        router.push('/login')
      }
    }
  }, [requiredAndNotLoading, onUnauthenticated])

  if (requiredAndNotLoading) {
    return { status: AuthStatus.Loading } as AuthUserContextValue
  }

  return value
}

export default UseAuthUser
