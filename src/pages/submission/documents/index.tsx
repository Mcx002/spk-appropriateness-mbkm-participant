import dynamic from 'next/dynamic'

const Page = dynamic(() => import('@/modules/submission/documents'), { ssr: false })

export default Page
