import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNodeLike } from 'prop-types'
import { FC, useEffect, useState } from 'react'

import Card, { CardBody, CardHead } from '@/components/Card'
import { SubmissionSteps } from '@/modules/submission/SubmissionSteps'
import { SubmissionFormProfileState, SubmissionFormState } from '@/types/submission'

import DashboardLayout from './Dashboard-layout'

type SubmissionFormProps = {
  children?: ReactNodeLike
  profile?: SubmissionFormProfileState
  page: number
}

const SubmissionForm: FC<SubmissionFormProps> = ({ children, page, profile }) => {
  const router = useRouter()
  const [form, setForm] = useState<SubmissionFormState>({
    profile: {
      avatar: {
        filename: '',
      },
      nim: '',
      fullName: '',
      email: '',
      registerPeriod: '',
      class: '',
      activeSemester: '',
      prodi: {
        xid: '',
        name: '',
      },
    },
    grades: {
      se: 0,
      so: 0,
      nc: 0,
      db: 0,
      web: 0,
      jobdesc: '',
      ipk: 0,
      sks: 0,
    },
  })

  useEffect(() => {
    if (profile) {
      setForm({
        ...form,
        profile,
      })
    }
  }, [profile])
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
              <SubmissionSteps active={page} />
            </CardBody>
          </Card>
          <Card className='h-fit flex-1'>
            <CardHead className='flex justify-between'>
              <span>Detail Mahasiswa</span>
              <span className='text-[10px] font-normal text-danger'>* Indicates required field</span>
            </CardHead>
            <CardBody className='body grid grid-cols-1 gap-6 p-6'>
              <form className='grid grid-cols-1 gap-6 p-6'>{children}</form>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SubmissionForm
