import { ArrowDropDown } from '@mui/icons-material'
import Head from 'next/head'
import { ReactNodeLike } from 'prop-types'
import React, { FC } from 'react'
import { Toaster } from 'react-hot-toast'

import LsUtamaLogo from '~/assets/icons/ls-utama-logo.png'

type dashboardProps = {
  title: string
  children?: ReactNodeLike
}

const DashboardLayout: FC<dashboardProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{`${title} | App`}</title>
      </Head>
      <div className='relative grid grid-cols-1'>
        <div className='z-10 flex w-full flex-row justify-between p-3.5 px-[52px] shadow-xl'>
          <img
            className='z-0 h-[36px] w-[120px]'
            src={LsUtamaLogo.src}
            alt=''
          />
          <div className='right-side flex flex-row'>
            <div className='profile flex flex-row items-center gap-2'>
              <img
                src='https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg'
                alt=''
                className='h-8 w-8 rounded-full object-cover'
              />
              <span className='profile-name'>Agus Purnomo</span>
              <ArrowDropDown className='ml-6 text-[#7A7A7A]' />
            </div>
          </div>
        </div>
        {children}
        <Toaster />
      </div>
    </>
  )
}

export default DashboardLayout
