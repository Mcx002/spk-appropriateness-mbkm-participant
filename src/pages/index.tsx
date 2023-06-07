import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { getUserSession, UserRole } from '@/utils/auth'

const Page: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    const user = getUserSession()
    if (user) {
      if (user.role === UserRole.Lecture) {
        router.push('/prodi/dashboard')
      }
      if (user.role === UserRole.Student) {
        router.push('/dashboard')
      }
    }
    router.push('/login')
  }, [])

  return <div />
}

export default Page
