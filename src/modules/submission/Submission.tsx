import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Card, { CardBody, CardHead } from '@/components/Card'
import DashboardStudentLayout from '@/layouts/Dashboard-student-layout'
import { SubmissionSteps } from '@/modules/submission/SubmissionSteps'

import SubmissionDocuments from './SubmissionDocuments'
import SubmissionPreview from './SubmissionPreview'
import SubmissionProfile from './SubmissionProfile'

const Submission = () => {
  const router = useRouter()
  const id = parseInt(router.query.xid as string) ?? null
  const [submissionId, setSubmissionId] = useState<number | null>(id)

  const [page, setPage] = useState(0)

  function handleSetSubmissionId(id: number) {
    setSubmissionId(id)
  }

  function handleSetPage(num: number) {
    setPage(num)
  }

  function handleBackRoute() {
    switch (page) {
      case 0:
        router.push('/dashboard')
        break
      case 1:
        setPage(page - 1)
        break
      case 2:
        setPage(page - 1)
        break
    }
  }

  return (
    <DashboardStudentLayout title='Create Submission'>
      <div className='mt-[39px] grid grid-cols-1 gap-8 px-0 md:px-[140px]'>
        <div className='header flex flex-row gap-2'>
          <div
            onClick={handleBackRoute}
            className='cursor-pointer rounded-l border bg-white p-3 hover:bg-gray-100 active:bg-gray-200'
          >
            <ChevronLeft />
          </div>
          <div className='mt-1 flex flex-1 flex-col gap-2'>
            <div className='flex flex-row items-center justify-between'>
              <h1 className='font-montserrat text-[24px] font-bold'>Form Pengajuan</h1>
              <div className='breadcrumb hidden flex-row items-center gap-[9px] font-poppins font-bold md:flex'>
                <Link
                  className='link'
                  href='/dashboard'
                  replace={true}
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
        <div className='body flex flex-col gap-8 lg:flex-row'>
          <Card className='h-fit w-[100%] lg:w-[320px]'>
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
              {page === 0 ? (
                <SubmissionProfile
                  handleSetPage={handleSetPage}
                  submissionId={submissionId ?? undefined}
                  handleSetSubmissionId={handleSetSubmissionId}
                />
              ) : page === 1 ? (
                <SubmissionDocuments
                  handleSetPage={handleSetPage}
                  submissionId={submissionId ?? 0}
                />
              ) : page === 2 ? (
                <SubmissionPreview
                  handleSetPage={handleSetPage}
                  submissionId={submissionId ?? 0}
                />
              ) : (
                ''
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardStudentLayout>
  )
}

export default Submission
