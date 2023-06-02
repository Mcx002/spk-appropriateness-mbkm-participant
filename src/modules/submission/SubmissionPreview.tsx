import { Dialog } from '@headlessui/react'
import { Description, Info } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import { FC, MouseEvent, useEffect, useState } from 'react'

import { useCreateSubmissionMutation, useLazyGetMyDocumentsQuery } from '@/services/submissions'
import { SubmissionDocumentsState, SubmissionFormState } from '@/types/submission'

import TimeFast from '~/assets/icons/Icon_Time Fast.svg'
import InputComponent from '@/components/InputComponent'
import { useRouter } from 'next/router'

type SubmissionPreviewProps = {
  form: SubmissionFormState
  documents: SubmissionDocumentsState
}

const SubmissionPreview: FC<SubmissionPreviewProps> = ({ form, documents }) => {
  const router = useRouter()
  const profile = form.profile
  const [isOpen, setIsOpen] = useState(false)
  const [frs, setFrs] = useState({
    filename: '',
    url: '',
  })
  const [transcript, setTrancript] = useState({
    filename: '',
    url: '',
  })
  const [
    getMyDocuments,
    {
      // isLoading: isGetMyDocumentLoading,
      // isError: isGetMyDocumentError,
      data: dataMyDocuments,
      error: errorMyDocuments,
    },
  ] = useLazyGetMyDocumentsQuery()
  const [
    createSubmission,
    {
      isSuccess: isCreateSubmissionSuccess,
      isError: isCreateSubmissionError,
      data: createSubmissionData,
      error: createSubmissionError,
      isLoading: isCreateSubmissionLoading,
    },
  ] = useCreateSubmissionMutation()

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)

    getMyDocuments({})

    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [])

  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = ''
  }

  useEffect(() => {
    if (dataMyDocuments) {
      for (const res of dataMyDocuments.result) {
        if (res.filename === 'frs.pdf') {
          setFrs(res)
        }
        if (res.filename === 'transcript.pdf') {
          setTrancript(res)
        }
      }
    }
  }, [dataMyDocuments])

  useEffect(() => {
    if (errorMyDocuments) {
      console.log(errorMyDocuments)
    }
  }, [errorMyDocuments])

  useEffect(() => {
    if (isCreateSubmissionSuccess && createSubmissionData) {
      router.push('/dashboard')
    }
  }, [isCreateSubmissionSuccess, createSubmissionData])

  useEffect(() => {
    if (isCreateSubmissionError && createSubmissionError) {
      console.log(createSubmissionError)
    }
  }, [isCreateSubmissionError, createSubmissionError])

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    createSubmission(form)
    setIsOpen(false)
  }
  return (
    <>
      <div className='body grid grid-cols-1 gap-5 p-6'>
        <h1 className='font-poppins font-bold text-primary'>Preview</h1>
        <div className='grid grid-cols-3 gap-2 text-xs leading-[22px] text-[#464646]'>
          <span className='title font-semibold'>NIM</span>
          <span className='value col-span-2'>{profile.nim}</span>
          <span className='title font-semibold'>Nama Lengkap</span>
          <span className='value col-span-2'>{profile.fullName}</span>
          <span className='title font-semibold'>Email Widyatama</span>
          <span className='value col-span-2'>{profile.email}</span>
          <span className='title font-semibold'>Program Studi</span>
          <span className='value col-span-2'>{profile.prodi.name}</span>
          <span className='title font-semibold'>Periode Masuk</span>
          <span className='value col-span-2'>{profile.registerPeriod}</span>
          <span className='title font-semibold'>Kelas</span>
          <span className='value col-span-2'>{profile.class}</span>
          <span className='title font-semibold'>Semester Aktif</span>
          <span className='value col-span-2'>Semester {profile.activeSemester}</span>
        </div>
        <h1 className='font-poppins font-bold text-primary'>Persyaratan</h1>
        <div className='grid grid-cols-1 gap-4 text-xs text-[#464646] md:grid-cols-2'>
          <div className='grid grid-cols-3 gap-2'>
            <span className='col-span-2 font-bold'>IPK</span>
            <span>{form.grades.ipk}</span>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <span className='col-span-2 font-bold'>Total SKS</span>
            <span>{form.grades.sks} SKS</span>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <span className='col-span-2 font-bold'>Nilai Rekayasa Perangkat Lunak</span>
            <span>{form.grades.se}</span>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <span className='col-span-2 font-bold'>Nilai Sistem Operasi</span>
            <span>{form.grades.so}</span>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <span className='col-span-2 font-bold'>Nilai Jaringan Komputer</span>
            <span>{form.grades.nc}</span>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <span className='col-span-2 font-bold'>Nilai Basis Data</span>
            <span>{form.grades.db}</span>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <span className='col-span-2 font-bold'>Nilai Pengembangan Aplikasi Berbasis Web</span>
            <span>{form.grades.web}</span>
          </div>
        </div>
        <InputComponent
          className='h-min-[200px] w-full rounded border-[#DFDFDF] text-sm text-[#464646]'
          label='Kesesuaian Capaian Pembelajaran'
          showRequiredSymbol={false}
          disabled={true}
          placeholder='Tambahkan detail deskripsi pekerjaan'
          type='textarea'
          id='jobdesc'
          value={form.grades.jobdesc}
        />
        <h1 className='font-poppins font-bold text-primary'>Preview Dokumen</h1>
        <div className='grid grid-cols-1 gap-[11px]'>
          <div className='relative flex flex-row items-center gap-5 rounded-xl border p-2 px-7 text-[#464646]'>
            <Description className='text-[#767676]' />
            <span className='flex-1'>{frs.filename}</span>
            <a
              href={frs.url}
              target='_blank'
              className='btn btn-primary-light border px-4 text-xs md:px-9 md:text-sm'
            >
              Cek Detail
            </a>
            {frs.url === '' && (
              <div className='!absolute flex !h-[100%] !w-[100%] items-center justify-center bg-white/70'>
                <CircularProgress sx={{ color: '#ddd' }} />
              </div>
            )}
          </div>
          <div className='relative flex flex-row items-center gap-5 rounded-xl border p-2 px-7 text-[#464646]'>
            <Description className='text-[#767676]' />
            <span className='flex-1'>{transcript.filename}</span>
            <a
              href={transcript.url}
              target='_blank'
              className='btn btn-primary-light border px-4 text-xs md:px-9 md:text-sm'
            >
              Cek Detail
            </a>
            {transcript.url === '' && (
              <div className='!absolute flex !h-[100%] !w-[100%] items-center justify-center bg-white/70'>
                <CircularProgress sx={{ color: '#ddd' }} />
              </div>
            )}
          </div>
          {(frs.url === '' || transcript.url === '') && errorMyDocuments && (
            <div className='text-danger'>
              Failed to get documents.
              <a
                href='#'
                onClick={() => getMyDocuments({})}
                className='text-blue-500'
              >
                Try Again
              </a>
            </div>
          )}
          {/* <div className='flex flex-row items-center gap-5 rounded-xl border p-2 px-7 text-[#464646]'>
            <Description className='text-[#767676]' />
            <span className='flex-1'>History Pembayaran.pdf</span>
            <Link
              href=''
              className='btn btn-primary-light border'
            >
              Cek Detail
            </Link>
          </div> */}
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
              onClick={() => {
                setIsOpen(true)
              }}
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className='fixed inset-0 flex items-center justify-center p-4'>
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
                  onClick={handleSubmit}
                  className='btn btn-primary'
                >
                  OK
                </button>
              </Dialog.Panel>
            </div>
          </div>
        </div>
      </Dialog>
      {isCreateSubmissionLoading && (
        <div className='fixed left-0 top-0 flex h-[100vh] w-[100vw] items-center justify-center bg-white/70'>
          <CircularProgress />
        </div>
      )}
    </>
  )
}

export default SubmissionPreview
