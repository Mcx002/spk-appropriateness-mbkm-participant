import { FC, useEffect, useState } from 'react'
import { getUserSession, UserRole } from '@/utils/auth'
import { useRouter } from 'next/router'
import Forbidden from '@/modules/errors/403'
import { ReactNodeLike } from 'prop-types'
import DashboardLayout from '@/layouts/Dashboard-layout'

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
