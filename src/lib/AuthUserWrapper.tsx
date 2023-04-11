import { NextSeo } from 'next-seo'
import React, { FC } from 'react'

import { appName } from '@/config/env'
import { AuthStatus } from '@/lib/auth/types'

import useAuthUser from './UseAuthUser'

interface withAuthAppProps {
  children: React.ReactNode
}

const UserAppWrapper: FC<withAuthAppProps> = ({ children }) => {
  const { status } = useAuthUser({ required: true })

  if (status !== AuthStatus.Authenticated) {
    return (
      <>
        <NextSeo
          title='Loading...'
          titleTemplate={`%s | ${appName}`}
        />
      </>
    )
  }

  return <>{children}</>
}

export default UserAppWrapper
