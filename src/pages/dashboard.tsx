import dynamic from 'next/dynamic'

const Page = dynamic(() => import('@/modules/dashboard'), { ssr: false })

export default Page
