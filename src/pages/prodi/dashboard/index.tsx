import dynamic from 'next/dynamic'

const Page = dynamic(() => import('@/modules/prodi/dashboard'), { ssr: false })

export default Page
