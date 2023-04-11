import { CameraAlt, ChevronLeft, ChevronRight } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

import Card, { CardBody, CardHead } from '@/components/Card'
import InputComponent from '@/components/InputComponent'
import DashboardLayout from '@/layouts/Dashboard-layout'
import { SubmissionSteps } from '@/modules/submission/SubmissionSteps'

import EmptyProfile from '~/assets/icons/empty-profile.svg'

const Submission = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    nim: '',
    fullName: '',
    email: '',
    startPeriod: '',
    kelas: '',
    activeSemester: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(form)
    router.push('/submission/documents')
  }
  return (
    <DashboardLayout title='Create Submission'>
      <div className='mt-[39px] grid grid-cols-1 gap-8 px-[140px]'>
        <div className='header flex flex-row gap-2'>
          <div
            onClick={router.back}
            className='cursor-pointer rounded-l border bg-white p-3 hover:bg-gray-100 active:bg-gray-200'
          >
            <ChevronLeft />
          </div>
          <div className='mt-1 flex flex-1 flex-col gap-2'>
            <div className='flex flex-row items-center justify-between'>
              <h1 className='font-montserrat text-[24px] font-bold'>Form Pengajuan</h1>
              <div className='breadcrumb flex flex-row items-center gap-[9px] font-poppins font-bold'>
                <Link
                  className='link'
                  href='/src/pages/dashboard'
                >
                  Beranda
                </Link>
                <ChevronRight className='text-lg' />
                <span className='text-[#A3A3A3]'>Form Pengajuan</span>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className='body flex flex-row gap-8'>
          <Card className='h-fit w-[320px]'>
            <CardHead>Step 1 of 3</CardHead>
            <CardBody>
              <p className='text-xs text-[#464646]'>Lengkapi data Anda untuk mengajukan MBKM</p>
              <SubmissionSteps active={0} />
            </CardBody>
          </Card>
          <Card className='flex-1'>
            <CardHead className='flex justify-between'>
              <span>Detail Mahasiswa</span>
              <span className='text-[10px] font-normal text-danger'>* Indicates required field</span>
            </CardHead>
            <CardBody className='body grid grid-cols-1 gap-6 p-6'>
              <form
                onSubmit={handleSubmit}
                className='grid grid-cols-1 gap-6 p-6'
              >
                <div className='image relative mb-2 w-fit'>
                  <div className='flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#EEEEEE]'>
                    <EmptyProfile className='h-[52px] w-[52px]' />
                  </div>
                  <div className='absolute right-0 mt-[-28px] mr-[-8px] flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full bg-white shadow-lg duration-75 hover:bg-gray-100 active:bg-gray-300'>
                    <CameraAlt className='h-5' />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-6'>
                  <InputComponent
                    label='NIM'
                    labelClassName='font-semibold text-[#464646] text-xs'
                    required
                    placeholder='xxxxxxxxxx'
                    helper='Please fill the text with a max length of 25 characters.'
                    type='number'
                    id='nim'
                    value={form.nim}
                    onChange={handleChange}
                  />
                  <InputComponent
                    label='Nama Lengkap'
                    labelClassName='font-semibold text-[#464646] text-xs'
                    required
                    placeholder='masukan nama lengkap'
                    id='fullName'
                    value={form.fullName}
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                  <InputComponent
                    label='Periode Masuk'
                    labelClassName='font-semibold text-[#464646] text-xs'
                    required
                    placeholder='masukan periode masuk'
                    type='number'
                    id='startPeriod'
                    value={form.startPeriod}
                    onChange={handleChange}
                  />
                  <InputComponent
                    label='Kelas'
                    labelClassName='font-semibold text-[#464646] text-xs'
                    required
                    placeholder='masukan kelas'
                    type='text'
                    id='kelas'
                    value={form.kelas}
                    onChange={handleChange}
                  />
                  <InputComponent
                    label='Semester Aktif'
                    labelClassName='font-semibold text-[#464646] text-xs'
                    required
                    placeholder='masukan semester aktif'
                    type='number'
                    id='activeSemester'
                    value={form.activeSemester}
                    onChange={handleChange}
                  />
                </div>
                <div className='action flex flex-row justify-end gap-6'>
                  <Link
                    href='/dashboard'
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
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Submission
