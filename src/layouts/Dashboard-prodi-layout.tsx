import { useRouter } from 'next/router'
import { ReactNodeLike } from 'prop-types'
import { FC, useEffect, useState } from 'react'

import DashboardLayout from '@/layouts/Dashboard-layout'
import Forbidden from '@/modules/errors/403'
import { getUserSession, UserRole } from '@/utils/auth'

type Props = {
  children: ReactNodeLike
  title: string
}

const DashboardProdiLayout: FC<Props> = ({ children, title }) => {
  const router = useRouter()
  const [isProhibited, setProhibited] = useState(true)
  useEffect(() => {
    const user = getUserSession()
    if (user && user.role === UserRole.Lecture) {
      setProhibited(false)
    }
  }, [])

  return isProhibited ? <Forbidden /> : <DashboardLayout title={title}>{children}</DashboardLayout>
}

export default DashboardProdiLayout
