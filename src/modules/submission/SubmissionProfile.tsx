import { CameraAlt } from '@mui/icons-material'
import Link from 'next/link'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'

import InputComponent from '@/components/InputComponent'
import { SubmissionDocumentsState, SubmissionFormProfileState } from '@/types/submission'

import EmptyProfile from '~/assets/icons/empty-profile.svg'

type SubmissionProfileProps = {
  handleSetPage: (num: number) => void
  handleChangeProfile: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  form: SubmissionFormProfileState
  handleSetDocuments: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  documents: SubmissionDocumentsState
}

const SubmissionProfile: FC<SubmissionProfileProps> = ({
  handleSetPage,
  handleChangeProfile,
  form,
  handleSetDocuments,
  documents,
}) => {
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)

    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [])

  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = ''
  }

  useEffect(() => {
    if (documents && documents.avatar && documents.avatar !== null) {
      setAvatar(URL.createObjectURL(documents.avatar))
    }
  }, [documents])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleSetPage(1)
  }
  return (
    <form
      className='grid grid-cols-1 gap-6 p-6'
      onSubmit={handleSubmit}
    >
      <div className='flex justify-center md:justify-start'>
        <div className='image relative mb-2 w-fit'>
          <div className='flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full bg-[#EEEEEE]'>
            {avatar ? (
              <img
                src={avatar}
                className='!w-100 !h-100 object-cover'
                alt='avatar'
              />
            ) : (
              <EmptyProfile className='h-[52px] w-[52px]' />
            )}
          </div>
          <label htmlFor='avatar'>
            <input
              type='file'
              id='avatar'
              className='hidden'
              onChange={handleSetDocuments}
            />
            <div className='absolute right-0 mr-[-8px] mt-[-28px] flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full bg-white shadow-lg duration-75 hover:bg-gray-100 active:bg-gray-300'>
              <CameraAlt className='h-5' />
            </div>
          </label>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <InputComponent
          label='NIM'
          labelClassName='font-semibold text-[#464646] text-xs'
          required
          placeholder='xxxxxxxxxx'
          helper='Please fill the text with a max length of 25 characters.'
          type='number'
          id='nim'
          value={form.nim}
          onChange={handleChangeProfile}
          disabled={true}
        />
        <InputComponent
          label='Nama Lengkap'
          labelClassName='font-semibold text-[#464646] text-xs'
          required
          placeholder='masukan nama lengkap'
          id='fullName'
          value={form.fullName}
          onChange={handleChangeProfile}
          disabled={true}
        />
        <InputComponent
          label='Email Widyatama'
          labelClassName='font-semibold text-[#464646] text-xs'
          required
          placeholder='masukan email'
          helper={
            <>
              email menggunakan <span className='font-bold'>@widyatama</span>
            </>
          }
          type='email'
          id='email'
          value={form.email}
          onChange={handleChangeProfile}
          disabled={true}
        />
        <InputComponent
          label='Periode Masuk'
          labelClassName='font-semibold text-[#464646] text-xs'
          required
          placeholder='masukan periode masuk'
          type='text'
          id='registerPeriod'
          value={form.registerPeriod}
          onChange={handleChangeProfile}
        />
        <InputComponent
          label='Kelas'
          labelClassName='font-semibold text-[#464646] text-xs'
          required
          placeholder='masukan kelas'
          type='text'
          id='class'
          value={form.class}
          onChange={handleChangeProfile}
        />
        <InputComponent
          label='Semester Aktif'
          labelClassName='font-semibold text-[#464646] text-xs'
          required
          placeholder='masukan semester aktif'
          type='number'
          id='activeSemester'
          value={form.activeSemester}
          onChange={handleChangeProfile}
          min={1}
        />
      </div>
      <div className='action flex flex-row justify-end gap-6'>
        <Link
          href='/src/pages/dashboard'
          className='btn btn-primary-light border'
        >
          Batal
        </Link>
        <button
          className='btn btn-primary border'
          type='submit'
        >
          Selanjutnya
        </button>
      </div>
    </form>
  )
}

export default SubmissionProfile
