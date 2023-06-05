import { Dialog } from '@headlessui/react'
import { Description, Info } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import { FC, MouseEvent, useEffect, useState } from 'react'

import { useLazyGetSubmissionDetailQuery, useSubmitSubmissionMutation } from '@/services/submissions'
import { GetDetailSubmissionResponse } from '@/types/submission'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'

import TimeFast from '~/assets/icons/Icon_Time Fast.svg'
import InputComponent from '@/components/InputComponent'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

type SubmissionPreviewProps = {
  handleSetPage: (num: number) => void
  submissionId: number
}

const SubmissionPreview: FC<SubmissionPreviewProps> = ({ handleSetPage, submissionId }) => {
  const router = useRouter()
  const [preview, setPreview] = useState<GetDetailSubmissionResponse | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [getSubmissionDetail, { data: submissionDetail }] = useLazyGetSubmissionDetailQuery()
  const [
    submitSubmission,
    { isSuccess: submitSubmissionSuccess, error: submitSubmissionError, isLoading: submitSubmissionLoading },
  ] = useSubmitSubmissionMutation()

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)

    if (submissionId) {
      getSubmissionDetail({ xid: submissionId.toString() })
    }

    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [])

  useEffect(() => {
    if (submissionDetail) {
      setPreview(submissionDetail.result)
    }
  }, [submissionDetail])

  useEffect(() => {
    if (submitSubmissionSuccess) {
      setIsOpen(true)
    }
    if (submitSubmissionError) {
      toast.error('Failed to submit the submission. see console for more further')
      console.log(submitSubmissionError)
    }
  }, [submitSubmissionSuccess, submitSubmissionError])

  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = ''
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!submissionId) {
      toast.error('Submission Id is not found')
      return
    }
    const formData = new FormData()
    formData.append('id', submissionId.toString())

    submitSubmission(formData)
  }
  return (
    <>
      <div className='body grid grid-cols-1 gap-5 p-6'>
        <div className='flex flex-row justify-between'>
          <h1 className='font-poppins font-bold text-primary'>Preview</h1>
          <button
            className='flex items-center gap-2 text-xs text-blue-500'
            onClick={() => handleSetPage(0)}
          >
            <CreateOutlinedIcon className='!h-[18px] !w-[18px]' /> Edit
          </button>
        </div>
        {preview && (
          <div className='grid grid-cols-3 gap-2 text-xs leading-[22px] text-[#464646]'>
            <span className='title font-semibold'>NIM</span>
            <span className='value col-span-2'>{preview.detail.student.nim}</span>
            <span className='title font-semibold'>Nama Lengkap</span>
            <span className='value col-span-2'>{preview.detail.student.name}</span>
            <span className='title font-semibold'>Email Widyatama</span>
            <span className='value col-span-2'>{preview.detail.student.email}</span>
            <span className='title font-semibold'>Program Studi</span>
            <span className='value col-span-2'>{preview.detail.student.studyProgram.name}</span>
            <span className='title font-semibold'>Periode Masuk</span>
            <span className='value col-span-2'>{preview.detail.entry_period}</span>
            <span className='title font-semibold'>Kelas</span>
            <span className='value col-span-2'>{preview.detail.class}</span>
            <span className='title font-semibold'>Semester Aktif</span>
            <span className='value col-span-2'>Semester {preview.detail.semester}</span>
          </div>
        )}
        <div className='flex flex-row justify-between'>
          <h1 className='font-poppins font-bold text-primary'>Persyaratan</h1>
          <button
            className='flex items-center gap-2 text-xs text-blue-500'
            onClick={() => handleSetPage(1)}
          >
            <CreateOutlinedIcon className='!h-[18px] !w-[18px]' /> Edit
          </button>
        </div>
        {preview && (
          <div className='grid grid-cols-1 gap-4 text-xs text-[#464646] md:grid-cols-2'>
            <div className='grid grid-cols-3 gap-2'>
              <span className='col-span-2 font-bold'>IPK</span>
              <span>{preview.detail.ipk}</span>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <span className='col-span-2 font-bold'>Total SKS</span>
              <span>{preview.detail.total_sks} SKS</span>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <span className='col-span-2 font-bold'>Nilai Rekayasa Perangkat Lunak</span>
              <span>{preview.detail.rpl}</span>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <span className='col-span-2 font-bold'>Nilai Sistem Operasi</span>
              <span>{preview.detail.sistem_operasi}</span>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <span className='col-span-2 font-bold'>Nilai Jaringan Komputer</span>
              <span>{preview.detail.jarkom}</span>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <span className='col-span-2 font-bold'>Nilai Basis Data</span>
              <span>{preview.detail.basis_data}</span>
            </div>
            <div className='grid grid-cols-3 gap-2'>
              <span className='col-span-2 font-bold'>Nilai Pengembangan Aplikasi Berbasis Web</span>
              <span>{preview.detail.pengembangan_aplikasi_web}</span>
            </div>
          </div>
        )}
        {preview && (
          <InputComponent
            className='h-min-[200px] w-full rounded border-[#DFDFDF] text-sm text-[#464646]'
            label='Kesesuaian Capaian Pembelajaran'
            showRequiredSymbol={false}
            disabled={true}
            placeholder='Tambahkan detail deskripsi pekerjaan'
            type='textarea'
            id='jobdesc'
            value={preview.detail.learning_achievement}
          />
        )}
        <h1 className='font-poppins font-bold text-primary'>Preview Dokumen</h1>
        <div className='grid grid-cols-1 gap-[11px]'>
          {preview &&
            preview.documents.map((val, i) => (
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
        <div className='action mt-[20px] flex flex-col justify-between md:flex-row'>
          <div className='flex flex-row items-center gap-3'>
            <Info className='mat-icon-normal' />
            <span className='text-[10px] text-[#393939]'>
              Pastikan data Anda sudah sesuai, jika sudah dikirim tidak dapat diubah kembali
            </span>
          </div>
          <div className='mt-[12px] flex flex-row justify-end gap-[10px] md:mt-0'>
            <Link
              href='/src/pages/dashboard'
              className='btn btn-primary-light border'
            >
              Batal
            </Link>
            <button
              className='btn btn-primary border'
              onClick={handleSubmit}
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => {
          return
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
                <Dialog.Title className='text-center text-2xl font-semibold'>Data Berhasil Terkirim</Dialog.Title>
                <Dialog.Description className='flex flex-col items-center gap-3'>
                  <TimeFast className='h-[141px] w-[141px]' />
                  <span className='text-center text-sm text-[#464646]'>
                    Data yang berhasil dikirim akan dicek kembali oleh pihak kampus. Mohon cek berkala untuk mendapatkan
                    informasi selanjutnya
                  </span>
                </Dialog.Description>

                <button
                  onClick={() => router.push('/dashboard')}
                  className='btn btn-primary'
                >
                  OK
                </button>
              </Dialog.Panel>
            </div>
          </div>
        </div>
      </Dialog>
      {submitSubmissionLoading && (
        <div className='fixed left-0 top-0 flex h-[100vh] w-[100vw] items-center justify-center bg-white/70'>
          <CircularProgress />
        </div>
      )}
    </>
  )
}

export default SubmissionPreview
