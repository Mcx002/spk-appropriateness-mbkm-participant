import dynamic from 'next/dynamic'

const Page = dynamic(() => import('@/modules/submission'), { ssr: false })

export default Page
