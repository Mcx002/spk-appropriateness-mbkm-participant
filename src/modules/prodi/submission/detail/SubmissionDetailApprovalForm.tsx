import { Dialog } from '@headlessui/react'
import { Description } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import InputComponent from '@/components/InputComponent'
import { useProceedSubmissionMutation } from '@/services/submissions'
import { CommonError } from '@/types/common'
import { GetDetailSubmissionResponse, SUBMISSION_STATUS_ENUM } from '@/types/submission'
import clsxm from '@/utils/clsxm'

type Props = {
  data: GetDetailSubmissionResponse
}

type ApprovalFormDto = {
  achievement: string
  reason: string | null
}

type ProceedSubmissionError = {
  reason: string[]
}
const SubmissionDetailPreview: FC<Props> = ({ data }) => {
  const router = useRouter()
  const periodId = router.query.periodId
  const submissionId = router.query.submissionId
  const [approvalForm, setApprovalForm] = useState<ApprovalFormDto>({
    achievement: '0',
    reason: null,
  })

  // Dialog
  const [isRejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [isPromptDialogOpen, setPromptDialogOpen] = useState(false)

  // Services
  const [
    proceedSubmission,
    { isSuccess: proceedSubmissionSuccess, error: proceedSubmissionError, isLoading: proceedSubmissionLoading },
  ] = useProceedSubmissionMutation()
  const [reasonError, setReasonError] = useState<string[]>([])

  useEffect(() => {
    if (proceedSubmissionError) {
      const error = (proceedSubmissionError as CommonError).data.result as ProceedSubmissionError
      if (error) {
        setReasonError(error.reason)
      }
      toast.error((proceedSubmissionError as CommonError).data.message)
    }

    if (proceedSubmissionSuccess) {
      toast.success('Pengajuan user telah di proses')
      router.replace(`/prodi/period/${periodId}`)
    }
  }, [proceedSubmissionError, proceedSubmissionSuccess])

  const handleProceedSubmission = (status: SUBMISSION_STATUS_ENUM) => {
    const formData = new FormData()
    if (!periodId) {
      toast.error('Period id is not found')
      return
    }

    if (!submissionId) {
      toast.error('Submission id is not found')
      return
    }

    formData.append('period_id', periodId as string)
    formData.append('submission_id', submissionId as string)
    formData.append('status', status)

    if (status === SUBMISSION_STATUS_ENUM.REJECTED) {
      formData.append('reason', approvalForm.reason ?? '')
      proceedSubmission(formData)
    }

    formData.append('achievement', approvalForm.achievement)
    proceedSubmission(formData)
  }

  return (
    <div className='grid grid-cols-1 gap-4'>
      <h1 className='font-poppins font-bold text-primary'>Preview</h1>
      <div className='grid grid-cols-3 gap-2 text-xs leading-[22px] text-[#464646]'>
        <span className='title font-semibold'>NIM</span>
        <span className='value col-span-2'>{data.detail.student.nim}</span>
        <span className='title font-semibold'>Nama Lengkap</span>
        <span className='value col-span-2'>{data.detail.student.name}</span>
        <span className='title font-semibold'>Email Widyatama</span>
        <span className='value col-span-2'>{data.detail.student.email}</span>
        <span className='title font-semibold'>Program Studi</span>
        <span className='value col-span-2'>{data.detail.student.studyProgram.name}</span>
        <span className='title font-semibold'>Periode Masuk</span>
        <span className='value col-span-2'>{data.detail.entry_period}</span>
        <span className='title font-semibold'>Kelas</span>
        <span className='value col-span-2'>{data.detail.class}</span>
        <span className='title font-semibold'>Semester Aktif</span>
        <span className='value col-span-2'>Semester {data.detail.semester}</span>
      </div>
      <h1 className='font-poppins font-bold text-primary'>Persyaratan</h1>
      <div className='grid grid-cols-1 gap-4 text-xs text-[#464646] md:grid-cols-2'>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>IPK</span>
          <span>{data.detail.ipk}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Total SKS</span>
          <span>{data.detail.total_sks} SKS</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Rekayasa Perangkat Lunak</span>
          <span>{data.detail.rpl}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Sistem Operasi</span>
          <span>{data.detail.sistem_operasi}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Jaringan Komputer</span>
          <span>{data.detail.jarkom}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Basis Data</span>
          <span>{data.detail.basis_data}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Pengembangan Aplikasi Berbasis Web</span>
          <span>{data.detail.pengembangan_aplikasi_web}</span>
        </div>
      </div>
      <InputComponent
        className='h-min-[200px] w-full rounded border-[#DFDFDF] text-sm text-[#464646]'
        label='Kesesuaian Capaian Pembelajaran'
        showRequiredSymbol={false}
        disabled={true}
        placeholder='Tambahkan detail deskripsi pekerjaan'
        type='textarea'
        id='learning_achievement'
        value={data.detail.learning_achievement}
      />
      <div className='grid grid-cols-1 gap-4 text-xs text-[#464646] md:grid-cols-2'>
        <div className='grid grid-cols-3 items-center gap-2'>
          <span className='col-span-2 font-bold'>Penilaian Kesesuaian deskripsi pekerjaan</span>
          <InputComponent
            className='w-[80px] rounded border-[#DFDFDF] text-xs text-[#464646]'
            required
            placeholder='0.00'
            type='number'
            id='achievement'
            value={approvalForm.achievement}
            onChange={(e) => {
              setApprovalForm({ ...approvalForm, achievement: e.target.value })
            }}
            min={0}
            max={100}
          />
        </div>
      </div>
      <h1 className='font-poppins font-bold text-primary'>Preview Dokumen</h1>
      <div className='grid grid-cols-1 gap-[11px]'>
        {data.documents.map((val, i) => (
          <div
            key={i}
            className='relative flex flex-row items-center gap-5 rounded-xl border p-2 px-7 text-[#464646]'
          >
            <Description className='text-[#767676]' />
            <span className='flex-1'>{val.name}</span>
            <a
              href={val.url}
              target='_blank'
              className='btn btn-primary-light border px-4 text-xs md:px-9 md:text-sm'
            >
              Cek Detail
            </a>
          </div>
        ))}
      </div>
      <div className='mt-6 flex flex-row justify-between'>
        <div>
          <button className='btn btn-primary-light border'>Batal</button>
        </div>
        <div className='flex gap-4'>
          <button
            className='btn btn-primary-light border'
            onClick={() => setRejectDialogOpen(true)}
          >
            Tolak
          </button>
          <button
            className='btn btn-primary border'
            onClick={() => {
              setPromptDialogOpen(true)
            }}
          >
            Terima
          </button>
        </div>
      </div>
      <Dialog
        open={isRejectDialogOpen}
        onClose={() => {
          setRejectDialogOpen(false)
        }}
      >
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            className='fixed inset-0 bg-black/30'
            aria-hidden='true'
          />
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <Dialog.Panel className='mx-auto flex w-[530px] flex-col items-center gap-[26px] rounded bg-white p-7 px-[54px]'>
                <Dialog.Title className='text-center text-2xl font-semibold'>Apakah anda yakin?</Dialog.Title>
                <div className='grid w-[100%] grid-cols-1 gap-2'>
                  <Dialog.Description>Mohon masukan alasan penolakan</Dialog.Description>
                  <InputComponent
                    type='textarea'
                    className={clsxm('w-[100%] rounded border-gray-300', !!reasonError[0] && ' !border-danger')}
                    value={approvalForm.reason ?? ''}
                    onChange={(e) => {
                      setApprovalForm({ ...approvalForm, reason: e.target.value })
                    }}
                    error={!!reasonError[0]}
                    helper={reasonError[0]}
                  />
                  <div className='flex flex-row justify-end gap-3'>
                    <button
                      className='btn btn-primary-light border'
                      onClick={() => setRejectDialogOpen(false)}
                    >
                      Batal
                    </button>
                    <button
                      className='btn btn-primary'
                      onClick={() => {
                        handleProceedSubmission(SUBMISSION_STATUS_ENUM.REJECTED)
                      }}
                    >
                      Kirim
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={isPromptDialogOpen}
        onClose={() => {
          setPromptDialogOpen(false)
        }}
      >
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            className='fixed inset-0 bg-black/30'
            aria-hidden='true'
          />
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <Dialog.Panel className='mx-auto flex w-[530px] flex-col items-center gap-[26px] rounded bg-white p-7 px-[54px]'>
                <Dialog.Title className='text-center text-2xl font-semibold'>Apakah anda yakin?</Dialog.Title>
                <div className='grid w-[100%] grid-cols-1 gap-4 text-center'>
                  <Dialog.Description>
                    Anda tidak akan bisa mengubah status dari pengajuan yang telah anda proses. Pastikan anda yakin akan
                    menyetujui pengajuan ini!
                  </Dialog.Description>
                  <div className='flex flex-row items-center justify-center gap-3'>
                    <button
                      className='btn btn-primary-light border'
                      onClick={() => setPromptDialogOpen(false)}
                    >
                      Batal
                    </button>
                    <div className='h-fit w-fit'>
                      {proceedSubmissionLoading ? (
                        <div className='flex w-[75px] justify-center'>
                          <CircularProgress />
                        </div>
                      ) : (
                        <button
                          className='btn btn-primary'
                          onClick={() => {
                            handleProceedSubmission(SUBMISSION_STATUS_ENUM.APPROVED)
                          }}
                        >
                          Kirim
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default SubmissionDetailPreview
