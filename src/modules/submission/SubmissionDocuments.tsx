import Link from 'next/link'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'

import InputComponent from '@/components/InputComponent'
import { SubmissionDocumentsState, SubmissionFormGradesState } from '@/types/submission'
import { useLazyGetMyDocumentsQuery, useUploadFrsMutation, useUploadTranscriptMutation } from '@/services/submissions'
import toast from 'react-hot-toast'
import { CircularProgress } from '@mui/material'
import { FileType } from '@/types/common'

type SubmissionDocumentsProps = {
  handleSetPage: (num: number) => void
  handleChangeGrades: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  form: SubmissionFormGradesState
}

const SubmissionDocuments: FC<SubmissionDocumentsProps> = ({ handleSetPage, form, handleChangeGrades }) => {
  const [frs, setFrs] = useState<FileType | null>(null)
  const [transcript, setTrancript] = useState<FileType | null>(null)

  const [
    getMyDocuments,
    {
      isLoading: isGetMyDocumentLoading,
      isError: isGetMyDocumentError,
      data: dataMyDocuments,
      error: errorMyDocuments,
    },
  ] = useLazyGetMyDocumentsQuery()

  const [uploadFrs, { isError: isErrorUploadFrs, isSuccess: isSuccessUploadFrs }] = useUploadFrsMutation()

  const [uploadTranscript, { isError: isErrorUploadTranscript, isSuccess: isSuccessUploadTranscript }] =
    useUploadTranscriptMutation()

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
          setFrs({
            filename: res.etag,
            url: res.url,
          })
        }
        if (res.filename === 'transcript.pdf') {
          setTrancript({
            filename: res.etag,
            url: res.url,
          })
        }
      }
    }
  }, [dataMyDocuments])

  useEffect(() => {
    if (errorMyDocuments) {
      toast.error('Gagal mengambil dokumen')
    }
  }, [errorMyDocuments])
  // handle error
  useEffect(() => {
    if (isErrorUploadTranscript) {
      toast.error('Gagal mengunggah transkrip nilai, tolong coba lagi')
    }
  }, [isErrorUploadTranscript])

  useEffect(() => {
    if (isErrorUploadFrs) {
      toast.error('Gagal mengunggah dokumen frs, tolong coba lagi')
    }
  }, [isErrorUploadFrs])

  // handle success
  useEffect(() => {
    if (isSuccessUploadFrs) {
      toast.success('Sukses mengunggah dokumen frs')
    }
  }, [isSuccessUploadFrs])

  useEffect(() => {
    if (isSuccessUploadTranscript) {
      toast.success('Sukses mengunggah transkrip nilai')
    }
  }, [isSuccessUploadTranscript])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (frs === null || transcript === null) {
      toast.error('Dokumen belum terisi')
      return
    }
    handleSetPage(2)
  }

  function handleSetDocuments(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const e = event as ChangeEvent<HTMLInputElement>
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (e.target.id === 'frs') {
        const formData = new FormData()
        formData.append('file', file)
        uploadFrs(formData)
      }
      if (e.target.id === 'transcript') {
        const formData = new FormData()
        formData.append('file', file)
        uploadTranscript(formData)
      }
    }
  }

  return (
    <form
      className='grid grid-cols-1 gap-6 p-6'
      onSubmit={handleSubmit}
    >
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <div className='grid grid-cols-3 items-center gap-2'>
          <span className='col-span-2 text-xs font-bold !text-input-label'>
            IPK<span className='text-danger'> *</span>
          </span>
          <InputComponent
            className='w-[80px] rounded border-[#DFDFDF] text-[#464646]'
            required
            placeholder='0.00'
            type='number'
            id='ipk'
            value={form.ipk}
            onChange={handleChangeGrades}
            min={0}
            max={4}
            step='0.01'
          />
        </div>
        <div className='grid grid-cols-3 items-center gap-2'>
          <span className='col-span-2 text-xs font-bold !text-input-label'>
            Total SKS<span className='text-danger'> *</span>
          </span>
          <InputComponent
            className='w-[80px] rounded border-[#DFDFDF] text-[#464646]'
            required
            placeholder='0'
            type='number'
            id='sks'
            value={form.sks}
            onChange={handleChangeGrades}
            min={0}
          />
        </div>
        <div className='grid grid-cols-3 items-center gap-2'>
          <span className='col-span-2 text-xs font-bold !text-input-label'>
            Nilai Rekayasa Perangkat Lunak<span className='text-danger'> *</span>
          </span>
          <InputComponent
            className='w-[80px] rounded border-[#DFDFDF] text-[#464646]'
            required
            placeholder='0.00'
            type='number'
            id='se'
            value={form.se}
            onChange={handleChangeGrades}
            min={0}
            max={4}
            step='0.01'
          />
        </div>
        <div className='grid grid-cols-3 items-center gap-2'>
          <span className='col-span-2 text-xs font-bold !text-input-label'>
            Nilai Sistem Operasi<span className='text-danger'> *</span>
          </span>
          <InputComponent
            className='w-[80px] rounded border-[#DFDFDF] text-[#464646]'
            required
            placeholder='0.00'
            type='number'
            id='so'
            value={form.so}
            onChange={handleChangeGrades}
            min={0}
            max={4}
            step='0.01'
          />
        </div>
        <div className='grid grid-cols-3 items-center gap-2'>
          <span className='col-span-2 text-xs font-bold !text-input-label'>
            Nilai Jaringan komputer<span className='text-danger'> *</span>
          </span>
          <InputComponent
            className='w-[80px] rounded border-[#DFDFDF] text-[#464646]'
            required
            placeholder='0.00'
            type='number'
            id='nc'
            value={form.nc}
            onChange={handleChangeGrades}
            min={0}
            max={4}
            step='0.01'
          />
        </div>
        <div className='grid grid-cols-3 items-center gap-2'>
          <span className='col-span-2 text-xs font-bold !text-input-label'>
            Nilai Basis Data<span className='text-danger'> *</span>
          </span>
          <InputComponent
            className='w-[80px] rounded border-[#DFDFDF] text-[#464646]'
            required
            placeholder='0.00'
            type='number'
            id='db'
            value={form.db}
            onChange={handleChangeGrades}
            min={0}
            max={4}
            step='0.01'
          />
        </div>
        <div className='grid grid-cols-3 items-center gap-2'>
          <span className='col-span-2 text-xs font-bold !text-input-label'>
            Nilai Pengembangangan Aplikasi Berbasis Web<span className='text-danger'> *</span>
          </span>
          <InputComponent
            className='w-[80px] rounded border-[#DFDFDF] text-[#464646]'
            required
            placeholder='0.00'
            type='number'
            id='web'
            value={form.web}
            onChange={handleChangeGrades}
            min={0}
            max={4}
            step='0.01'
          />
        </div>
      </div>
      <InputComponent
        className='h-min-[200px] w-full rounded border-[#DFDFDF] text-sm text-[#464646]'
        label='Kesesuaian Capaian Pembelajaran'
        required
        placeholder='Tambahkan detail deskripsi pekerjaan'
        type='textarea'
        id='jobdesc'
        value={form.jobdesc}
        onChange={handleChangeGrades}
      />
      <div>
        <h1 className='mb-5 mt-6 font-poppins text-base font-bold text-[#464646]'>Unggah Dokumen Pendukung</h1>
        <hr />
      </div>
      <div className='relative grid gap-6'>
        <InputComponent
          type='file'
          label='Unggah Transkrip Nilai'
          required
          id='transcript'
          placeholder='Format file .pdf'
          onChange={handleSetDocuments}
          value={transcript?.filename ?? ''}
          error={isGetMyDocumentError}
        />
        <InputComponent
          type='file'
          label='Unggah FRS'
          required
          id='frs'
          placeholder='Format file .pdf'
          onChange={handleSetDocuments}
          value={frs?.filename ?? ''}
          error={isGetMyDocumentError}
        />
        {isGetMyDocumentLoading && (
          <div className='absolute left-0 top-0 flex !h-[100%] !w-[100%] items-center justify-center bg-white/50'>
            <CircularProgress sx={{ color: '#ddd' }} />
          </div>
        )}
        {isGetMyDocumentError && (
          <p className='text-xs text-danger'>
            Gagal mengambil dokumen.{' '}
            <a
              href='#'
              className='text-blue-500'
              onClick={() => getMyDocuments({})}
            >
              Coba Ulang
            </a>
          </p>
        )}
      </div>
      {/*<input type='file' onChange={(e) => {console.log(e.target.files)}} />*/}
      <div className='action flex flex-row justify-end gap-5'>
        <Link
          href='/src/pages/dashboard'
          className='btn btn-primary-light border px-3 md:px-9'
        >
          Batal
        </Link>
        <button
          className='btn btn-primary border px-3 md:px-9'
          type='submit'
        >
          Selanjutnya
        </button>
      </div>
    </form>
  )
}

export default SubmissionDocuments
