import { getCookie } from 'cookies-next'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { USER_ACCESS_TOKEN } from '@/config/token'

const Page: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (getCookie(USER_ACCESS_TOKEN)) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [])

  return <div />
}

export default Page
