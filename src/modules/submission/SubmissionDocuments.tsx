import Link from 'next/link'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'

import InputComponent from '@/components/InputComponent'
import { SubmissionDocumentsState, SubmissionFormGradesState } from '@/types/submission'
import {
  useLazyGetMyDocumentsQuery,
  useLazyGetSubmissionDetailQuery,
  useSaveSubmissionGradeMutation,
  useUploadFrsMutation,
  useUploadTranscriptMutation,
} from '@/services/submissions'
import toast from 'react-hot-toast'
import { CircularProgress } from '@mui/material'
import { CommonError, FileType } from '@/types/common'

type SubmissionDocumentsProps = {
  handleSetPage: (num: number) => void
  submissionId: number
}

const SubmissionDocuments: FC<SubmissionDocumentsProps> = ({ handleSetPage, submissionId }) => {
  const [form, setForm] = useState({
    ipk: 0,
    sks: 0,
    learning_achievement: '',
    rpl: 0,
    jarkom: 0,
    sistem_operasi: 0,
    basis_data: 0,
    web: 0,
  })
  const [
    getSubmissionDetail,
    { data: submissionDetail, isLoading: submissionDetailLoading, error: submissionDetailError },
  ] = useLazyGetSubmissionDetailQuery()
  const [frs, setFrs] = useState<FileType | null>(null)
  const [transcript, setTrancript] = useState<FileType | null>(null)

  const [uploadFrs, { isError: isErrorUploadFrs, isSuccess: isSuccessUploadFrs }] = useUploadFrsMutation()

  const [uploadTranscript, { isError: isErrorUploadTranscript, isSuccess: isSuccessUploadTranscript }] =
    useUploadTranscriptMutation()
  const [
    saveSubmissionGrade,
    {
      isSuccess: saveSubmissionGradeSuccess,
      isLoading: saveSubmissionGradeLoading,
      isError: saveSubmissionGradeFailed,
    },
  ] = useSaveSubmissionGradeMutation()

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
      const data = submissionDetail.result.detail
      setForm({
        ...form,
        ipk: data.ipk,
        sks: data.total_sks,
        rpl: data.rpl,
        sistem_operasi: data.sistem_operasi,
        jarkom: data.jarkom,
        basis_data: data.basis_data,
        web: data.pengembangan_aplikasi_web,
        learning_achievement: data.learning_achievement,
      })
      for (const doc of submissionDetail.result.documents) {
        if (doc.name === 'frs.pdf') {
          setFrs({ ...frs, filename: doc.name, url: doc.url })
        }
        if (doc.name === 'transcript.pdf') {
          setTrancript({ ...frs, filename: doc.name, url: doc.url })
        }
      }
    }
  }, [submissionDetail])

  useEffect(() => {
    if (submissionDetailError) {
      toast.error((submissionDetailError as CommonError).data.message)
    }
  }, [submissionDetailError])

  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = ''
  }

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
      setFrs({ ...transcript, filename: 'frs.pdf' })
    }
  }, [isSuccessUploadFrs])

  useEffect(() => {
    if (isSuccessUploadTranscript) {
      toast.success('Sukses mengunggah transkrip nilai')
      setTrancript({ ...transcript, filename: 'transcript.pdf' })
    }
  }, [isSuccessUploadTranscript])

  useEffect(() => {
    if (saveSubmissionGradeSuccess) {
      handleSetPage(2)
    }

    if (saveSubmissionGradeFailed) {
      toast('Failed when saving submission')
    }
  }, [saveSubmissionGradeSuccess, saveSubmissionGradeFailed])

  function handleSetDocuments(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const e = event as ChangeEvent<HTMLInputElement>
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (e.target.id === 'frs') {
        const formData = new FormData()
        formData.append('period_id', submissionDetail?.result.detail.period_id.toString() ?? '0')
        formData.append('submission_id', submissionId.toString())
        formData.append('file', file)
        uploadFrs(formData)
      }
      if (e.target.id === 'transcript') {
        const formData = new FormData()
        formData.append('period_id', submissionDetail?.result.detail.period_id.toString() ?? '0')
        formData.append('submission_id', submissionId.toString())
        formData.append('file', file)
        uploadTranscript(formData)
      }
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!submissionId) {
      toast.error('Submission Id is not found')
      return
    }
    const formData = new FormData()
    formData.append('ipk', form.ipk.toString())
    formData.append('sks', form.sks.toString())
    formData.append('rpl', form.rpl.toString())
    formData.append('sistem_operasi', form.sistem_operasi.toString())
    formData.append('jarkom', form.jarkom.toString())
    formData.append('basis_data', form.basis_data.toString())
    formData.append('rpl', form.rpl.toString())
    formData.append('learning_achievement', form.learning_achievement)
    formData.append('id', submissionId.toString())
    saveSubmissionGrade(formData)
  }

  function handleChangeInput(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.id]: e.target.value })
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
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
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
            id='rpl'
            value={form.rpl}
            onChange={handleChangeInput}
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
            id='sistem_operasi'
            value={form.sistem_operasi}
            onChange={handleChangeInput}
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
            id='jarkom'
            value={form.jarkom}
            onChange={handleChangeInput}
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
            id='basis_data'
            value={form.basis_data}
            onChange={handleChangeInput}
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
            onChange={handleChangeInput}
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
        id='learning_achievement'
        value={form.learning_achievement}
        onChange={handleChangeInput}
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
        />
        <InputComponent
          type='file'
          label='Unggah FRS'
          required
          id='frs'
          placeholder='Format file .pdf'
          onChange={handleSetDocuments}
          value={frs?.filename ?? ''}
        />
        {submissionDetailLoading && (
          <div className='absolute left-0 top-0 flex !h-[100%] !w-[100%] items-center justify-center bg-white/50'>
            <CircularProgress sx={{ color: '#ddd' }} />
          </div>
        )}
        {submissionDetailError && (
          <p className='text-xs text-danger'>
            Gagal mengambil dokumen.{' '}
            <a
              href='#'
              className='text-blue-500'
              onClick={() => getSubmissionDetail({ xid: submissionId.toString() })}
            >
              Coba Ulang
            </a>
          </p>
        )}
      </div>
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
