import dynamic from 'next/dynamic'

const Page = dynamic(() => import('@/modules/submission/preview'), { ssr: false })

export default Page
