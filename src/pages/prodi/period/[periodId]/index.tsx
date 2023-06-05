import dynamic from 'next/dynamic'

const Page = dynamic(() => import('@/modules/prodi/submission'), { ssr: false })

export default Page
