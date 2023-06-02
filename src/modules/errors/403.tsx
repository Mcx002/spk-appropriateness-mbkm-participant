import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Forbidden = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className='fixed z-50 flex h-[100vh] w-[100vw] flex-col items-center justify-center bg-white pb-[150px]'>
      403 Forbidden
      <button
        className='text-blue-400'
        onClick={handleBack}
      >
        <KeyboardBackspaceIcon /> Back
      </button>
    </div>
  )
}

export default Forbidden
