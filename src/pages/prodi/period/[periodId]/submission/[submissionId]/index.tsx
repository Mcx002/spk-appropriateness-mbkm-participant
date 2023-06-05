import dynamic from 'next/dynamic'

const Page = dynamic(() => import('@/modules/prodi/submission/detail'), { ssr: false })

export default Page
