import { useRouter } from 'next/router'
import DashboardLayout from '@/layouts/Dashboard-layout'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import Link from 'next/link'
import Card, { CardBody, CardHead } from '@/components/Card'
import { useEffect, useState } from 'react'
import { GetDetailSubmissionResponse, SUBMISSION_STATUS_ENUM } from '@/types/submission'
import SubmissionDetailPreview from '@/modules/prodi/submission/detail/SubmissionDetailPreview'
import SubmissionDetailApprovalForm from '@/modules/prodi/submission/detail/SubmissionDetailApprovalForm'
import { useLazyGetSubmissionDetailQuery } from '@/services/submissions'

export const SubmissionDetail = () => {
  const router = useRouter()
  const [submission, setSubmission] = useState<GetDetailSubmissionResponse | null>(null)
  const xid = router.query.submissionId as string
  const periodId = router.query.periodId as string
  const [getSubmissionDetail, { data: submissionDetail }] = useLazyGetSubmissionDetailQuery()

  useEffect(() => {
    getSubmissionDetail({ xid })
  }, [])

  useEffect(() => {
    if (submissionDetail) {
      setSubmission(submissionDetail.result)
    }
  }, [submissionDetail])

  const handleBackRoute = () => {
    router.back()
  }
  return submission ? (
    <DashboardLayout title='Create Submission'>
      <div className='mb-[100px] mt-[39px] grid grid-cols-1 gap-8 px-0 md:px-[140px]'>
        <div className='header flex flex-row gap-2'>
          <div
            onClick={handleBackRoute}
            className='cursor-pointer rounded-l border bg-white p-3 hover:bg-gray-100 active:bg-gray-200'
          >
            <ChevronLeft />
          </div>
          <div className='mt-1 flex flex-1 flex-col gap-2'>
            <div className='flex flex-row items-center justify-between'>
              <h1 className='font-montserrat text-[24px] font-bold'>Detil Pengajuan</h1>
              <div className='breadcrumb hidden flex-row items-center gap-[9px] font-poppins font-bold md:flex'>
                <Link
                  className='link'
                  href='/prodi/dashboard'
                >
                  Beranda
                </Link>
                <ChevronRight className='text-lg' />
                <Link
                  className='link'
                  href={`/prodi/period/${periodId}`}
                >
                  Daftar Pengajuan
                </Link>
                <ChevronRight className='text-lg' />
                <span className='text-[#A3A3A3]'>Detil Pengajuan</span>
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
              {submission.detail.status === SUBMISSION_STATUS_ENUM.APPROVED ? (
                <SubmissionDetailPreview data={submission} />
              ) : submission.detail.status === SUBMISSION_STATUS_ENUM.REJECTED ? (
                <div className='rounded border border-[#949494] p-16'>Pengajuan ini telah anda tolak</div>
              ) : submission.detail.status === SUBMISSION_STATUS_ENUM.SUBMITTED ? (
                <SubmissionDetailApprovalForm data={submission} />
              ) : (
                'loading...'
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  ) : (
    <div className='flex h-[100vh] w-[100vw] items-center justify-center'>loading...</div>
  )
}

export default SubmissionDetail
