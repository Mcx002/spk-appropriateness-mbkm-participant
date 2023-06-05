import { NextPage } from 'next'
import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useRouter } from 'next/router'

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
