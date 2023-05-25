import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'

import '@/styles/theme.css'

import authRouting from '@/config/authRouting'
import { apiBaseUrl } from '@/config/env'
import { USER_ACCESS_TOKEN } from '@/config/token'
import UserAppProvider from '@/lib/AuthUserProvider'
import { wrapper } from '@/store'

const App: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  const router = useRouter()
  return (
    <>
      {authRouting.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <UserAppProvider
          baseUrl={String(apiBaseUrl)}
          cookieName={USER_ACCESS_TOKEN}
        >
          <Component {...pageProps} />
        </UserAppProvider>
      )}
    </>
  )
}

export default wrapper.withRedux(App)
