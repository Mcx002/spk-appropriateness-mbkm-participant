import Link from 'next/link'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import InputComponent from '@/components/InputComponent'
import { useGetOpenPeriodQuery } from '@/services/period'
import { useLazyGetSubmissionDetailQuery, useSaveSubmissionProfileMutation } from '@/services/submissions'
import { getUserSession } from '@/utils/auth'

type SubmissionProfileProps = {
  handleSetPage: (num: number) => void
  submissionId?: number
  handleSetSubmissionId: (num: number) => void
}

const SubmissionProfile: FC<SubmissionProfileProps> = ({ handleSetPage, submissionId, handleSetSubmissionId }) => {
  const [form, setForm] = useState({
    entry_period: '',
    class: '',
    active_semester: '',
    period_id: '',
    full_name: '',
    nim: '',
    email: '',
  })
  const { data: openPeriodData } = useGetOpenPeriodQuery()
  const [getSubmissionDetail, { data: submissionDetail, error: submissionDetailError }] =
    useLazyGetSubmissionDetailQuery()
  const [saveSubmissionProfile, { data: saveSubmissionProfileData, isError: saveSubmissionProfileFailed }] =
    useSaveSubmissionProfileMutation()

  useEffect(() => {
    if (submissionId) {
      getSubmissionDetail({ xid: submissionId.toString() })
    }

    window.addEventListener('beforeunload', alertUser)

    return () => {
      window.removeEventListener('beforeunload', alertUser)
    }
  }, [])

  useEffect(() => {
    let tempForm = form
    const userSession = getUserSession()
    if (userSession) {
      tempForm = { ...tempForm, full_name: userSession.name, nim: userSession.nim, email: userSession.email }
    }
    if (submissionDetail) {
      const data = submissionDetail.result.detail

      tempForm = {
        ...tempForm,
        class: data.class,
        entry_period: data.entry_period,
        active_semester: data.semester.toString(),
      }
    }
    if (openPeriodData) {
      tempForm = { ...tempForm, period_id: openPeriodData.result.id.toString() }
    }

    setForm(tempForm)
  }, [submissionDetail, openPeriodData])

  useEffect(() => {
    if (saveSubmissionProfileData) {
      handleSetSubmissionId(saveSubmissionProfileData.result.id)
      handleSetPage(1)
    }

    if (saveSubmissionProfileFailed) {
      toast.error('Failed when saving submission')
    }
  }, [saveSubmissionProfileData, saveSubmissionProfileFailed])

  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = ''
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('entry_period', form.entry_period)
    formData.append('class', form.class)
    formData.append('active_semester', form.active_semester)
    formData.append('period_id', form.period_id)
    if (submissionId) {
      formData.append('id', submissionId.toString())
    }
    saveSubmissionProfile(formData)
  }

  function handleChangeForm(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  return !submissionDetailError ? (
    <form
      className='grid grid-cols-1 gap-6 p-6'
      onSubmit={handleSubmit}
    >
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <InputComponent
          label='NIM'
          labelClassName='font-semibold text-[#464646] text-xs'
          required
          placeholder='xxxxxxxxxx'
          helper='Please fill the text with a max length of 25 characters.'
          type='number'
          id='nim'
          value={form.nim}
          disabled={true}
        />
        <InputComponent
          label='Nama Lengkap'
          labelClassName='font-semibold text-[#464646] text-xs'
          required
          placeholder='masukan nama lengkap'
          id='fullName'
          value={form.full_name}
          disabled={true}
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
          disabled={true}
        />
        <InputComponent
          label='Periode Masuk'
          labelClassName='font-semibold text-[#464646] text-xs'
          required
          placeholder='masukan periode masuk'
          type='text'
          id='entry_period'
          value={form.entry_period}
          onChange={handleChangeForm}
        />
        <InputComponent
          label='Kelas'
          labelClassName='font-semibold text-[#464646] text-xs'
          required
          placeholder='masukan kelas'
          type='text'
          id='class'
          value={form.class}
          onChange={handleChangeForm}
        />
        <InputComponent
          label='Semester Aktif'
          labelClassName='font-semibold text-[#464646] text-xs'
          required
          placeholder='masukan semester aktif'
          type='number'
          id='active_semester'
          value={form.active_semester}
          onChange={handleChangeForm}
          min={1}
        />
      </div>
      <div className='action flex flex-row justify-end gap-6'>
        <Link
          href='/src/pages/dashboard'
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
  ) : (
    <>(submissionDetailError as CommonError).data.message</>
  )
}

export default SubmissionProfile
