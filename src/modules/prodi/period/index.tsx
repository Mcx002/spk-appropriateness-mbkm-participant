import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const Index: NextPage = () => {
  const router = useRouter()
  return (
    <div className='flex h-[100vh] w-[100vw] flex-col items-center justify-center'>
      Period id is not found
      <button
        className='text-blue-500'
        onClick={() => {
          router.back()
        }}
      >
        <KeyboardBackspaceIcon /> Back
      </button>
    </div>
  )
}

export default Index
