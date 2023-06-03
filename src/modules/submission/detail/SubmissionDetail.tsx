import { useRouter } from 'next/router'
import DashboardLayout from '@/layouts/Dashboard-layout'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import Link from 'next/link'
import Card, { CardBody, CardHead } from '@/components/Card'
import { useLazyGetSubmissionDetailQuery } from '@/services/submissions'
import { useEffect, useState } from 'react'
import { GetDetailSubmissionResponse, SUBMISSION_STATUS_ENUM } from '@/types/submission'
import SubmissionDetailPreview from '@/modules/submission/detail/SubmissionDetailPreview'
import { CommonError } from '@/types/common'
import DashboardStudentLayout from '@/layouts/Dashboard-student-layout'

export const SubmissionDetail = () => {
  const router = useRouter()
  const [submission, setSubmission] = useState<GetDetailSubmissionResponse | null>(null)
  const xid = router.query.xid as string
  const [getSubmissionDetail, { data, error }] = useLazyGetSubmissionDetailQuery()

  useEffect(() => {
    getSubmissionDetail({ xid })
  }, [])

  useEffect(() => {
    if (data) {
      setSubmission(data.result)
    }
  }, [data])

  const handleBackRoute = () => {
    router.back()
  }
  return (
    <DashboardStudentLayout title='Create Submission'>
      <div className='mb-[50px] mt-[39px] grid grid-cols-1 gap-8 px-0 md:px-[140px]'>
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
        <div className='body'>
          <Card className='h-fit flex-1'>
            <CardHead className='flex justify-between'>
              <span>Detail Mahasiswa</span>
            </CardHead>
            <CardBody className='body grid grid-cols-1 gap-6 p-6'>
              {submission &&
                (submission.detail.status == SUBMISSION_STATUS_ENUM.APPROVED ? (
                  <SubmissionDetailPreview data={submission} />
                ) : submission.detail.status == SUBMISSION_STATUS_ENUM.REJECTED ? (
                  <div className='rounded border border-[#949494] p-16'>
                    Data yang Anda kirimkan kurang memenuhi syarat untuk mengikuti proses tahapan MBKM
                    <br />
                    Coba lagi dilain kesempatan, semoga sukses.
                  </div>
                ) : submission.detail.status == SUBMISSION_STATUS_ENUM.SUBMITTED ? (
                  <div className='rounded border border-[#949494] p-16'>
                    Data yang Anda kirimkan sedang dalam proses pengecekan.
                  </div>
                ) : (
                  'loading...'
                ))}
              {error && <div>{(error as CommonError).data.message}</div>}
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardStudentLayout>
  )
}

export default SubmissionDetail
