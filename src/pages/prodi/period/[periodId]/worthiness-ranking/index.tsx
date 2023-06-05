import dynamic from 'next/dynamic'

const Page = dynamic(() => import('@/modules/prodi/period/worthiness-ranking'), { ssr: false })

export default Page
