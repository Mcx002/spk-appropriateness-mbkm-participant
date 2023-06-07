import { Dialog } from '@headlessui/react'
import { ArrowDropDown } from '@mui/icons-material'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone'
import { CircularProgress } from '@mui/material'
import { deleteCookie } from 'cookies-next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNodeLike } from 'prop-types'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'

import { USER_ACCESS_TOKEN, USER_ACCESS_TOKEN_EXPIRATION, USER_REFRESH_TOKEN } from '@/config/token'
import { getUserSession } from '@/utils/auth'
import clsxm from '@/utils/clsxm'

import LsUtamaLogo from '~/assets/icons/ls-utama-logo.png'

type dashboardProps = {
  title: string
  children?: ReactNodeLike
}

const DashboardLayout: FC<dashboardProps> = ({ title, children }) => {
  const router = useRouter()
  const [user, setUser] = useState({
    name: '',
  })
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isLogoutPromptOpen, setLogoutPromptOpen] = useState(false)
  const [isLogoutLoading, setLogoutLoading] = useState(false)

  useEffect(() => {
    const user = getUserSession()
    if (user) {
      setUser({ name: user.name })
    }
  }, [])

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any): void {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const handleLogout = () => {
    setLogoutPromptOpen(true)
  }

  const handleCommitLogout = () => {
    setLogoutLoading(true)

    deleteCookie(USER_ACCESS_TOKEN)
    deleteCookie(USER_REFRESH_TOKEN)
    deleteCookie(USER_ACCESS_TOKEN_EXPIRATION)

    router.push('/login')
  }

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
              {/*<img*/}
              {/*  src='https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg'*/}
              {/*  alt=''*/}
              {/*  className='h-8 w-8 rounded-full object-cover'*/}
              {/*/>*/}
              <span className='profile-name'>{user.name}</span>
              <div className='relative'>
                <button
                  onClick={() => {
                    setDropdownOpen(!isDropdownOpen)
                  }}
                >
                  <ArrowDropDown className='ml-6 text-[#7A7A7A]' />
                </button>
                <div
                  ref={dropdownRef}
                  className={clsxm(
                    'absolute bottom-[-26px] left-[-150px] hidden w-[200px] bg-white shadow-md transition delay-150 ease-in-out',
                    isDropdownOpen && ' bottom-[-76px] block'
                  )}
                >
                  <ul className='list-none'>
                    <li>
                      <div
                        className='flex w-[100%] cursor-pointer select-none gap-2 p-4 hover:bg-gray-200 active:bg-gray-300'
                        onClick={() => handleLogout()}
                      >
                        <LogoutOutlinedIcon /> Logout
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {children}
        <Toaster />
      </div>

      <Dialog
        open={isLogoutPromptOpen}
        onClose={() => setLogoutPromptOpen(false)}
      >
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            className='fixed inset-0 bg-black/30'
            aria-hidden='true'
          />
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <Dialog.Panel className='mx-auto flex w-[530px] flex-col items-center gap-[26px] rounded bg-white p-7 px-[54px]'>
                <Dialog.Title className='text-center text-2xl font-semibold'>Log out?</Dialog.Title>
                <Dialog.Description className='flex flex-col items-center gap-3'>
                  <MeetingRoomTwoToneIcon className='!h-[141px] !w-[141px]' />
                  <span className='text-center text-sm text-[#464646]'>Apa anda yakin akan keluar?</span>
                </Dialog.Description>

                {isLogoutLoading ? (
                  <CircularProgress />
                ) : (
                  <button
                    onClick={handleCommitLogout}
                    className='btn btn-primary'
                  >
                    OK
                  </button>
                )}
              </Dialog.Panel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default DashboardLayout
