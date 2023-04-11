import dynamic from 'next/dynamic'

const Page = dynamic(() => import('@/modules/submission/detail'), { ssr: false })

export default Page
