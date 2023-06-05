import dynamic from 'next/dynamic'

const Page = dynamic(() => import('@/modules/prodi/period'), { ssr: false })

export default Page
