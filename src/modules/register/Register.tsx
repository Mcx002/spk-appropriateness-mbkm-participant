import { setCookie } from 'cookies-next'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import InputComponent from '@/components/InputComponent'
import InputPasswordComponent from '@/components/InputPasswordComponent'
import ListboxComponent, { convertToListboxOption, ListboxChangeEvent } from '@/components/ListboxComponent'
import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN } from '@/config/token'
import { useRegisterMutation } from '@/services/auth'
import { useLazyListFacultyQuery } from '@/services/faculty'
import { useLazyListProgramStudyQuery } from '@/services/program-study'
import { RegisterError } from '@/types/auth'
import { BaseResponse } from '@/types/common'
import { Faculty, FacultyListSortBy } from '@/types/faculty'
import { ProgramStudy } from '@/types/program-study'

const Register: NextPage = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    nim: '',
    full_name: '',
    email: '',
    password: '',
    faculty_xid: '',
    study_program_xid: '',
  })
  const baseRegisterError = {
    nim: [],
    full_name: [],
    email: [],
    password: [],
    faculty_xid: [],
    study_program_xid: [],
  }
  const [error, setError] = useState<RegisterError>(baseRegisterError)

  const [
    getListFaculty,
    {
      isFetching: listFacultyIsFetching,
      isSuccess: listFacultyIsSuccess,
      isError: listFacultyIsError,
      data: listFaculty,
    },
  ] = useLazyListFacultyQuery()

  const [
    getListProgramStudy,
    {
      isFetching: listProgramStudyIsFetching,
      isSuccess: listProgramStudyIsSuccess,
      isError: listProgramStudyIsError,
      data: listProgramStudy,
    },
  ] = useLazyListProgramStudyQuery()

  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | undefined>(undefined)
  const [selectedProgramStudy, setSelectedProgramStudy] = useState<Faculty | undefined>(undefined)

  const [
    register,
    {
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
      isError: registerIsError,
      error: registerError,
      data: registerResponse,
    },
  ] = useRegisterMutation()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleChangeListbox = (e: ListboxChangeEvent) => {
    setForm({ ...form, [e.id]: e.key })
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(form)
    register({ body: form })
  }

  useEffect(() => {
    getListFaculty({
      limit: 20,
      offset: 0,
      name: '',
      order: FacultyListSortBy.IdAsc,
    })
  }, [])

  useEffect(() => {
    if (listFaculty && listFaculty.result && listFaculty.result.length > 0) {
      const data = listFaculty.result[0]
      setForm({ ...form, faculty_xid: data.xid })
      setSelectedFaculty(data)
    }
    if (listProgramStudy && listProgramStudy.result && listProgramStudy.result.length > 0) {
      const data = listProgramStudy.result[0]
      setForm({ ...form, study_program_xid: data.xid })
      setSelectedProgramStudy(data)
    }
  }, [listFaculty, listProgramStudy])

  useEffect(() => {
    if (form.faculty_xid !== '') {
      getListProgramStudy({
        limit: 20,
        offset: 0,
        name: '',
        faculty_xid: form.faculty_xid,
      })
    }
  }, [form.faculty_xid])

  useEffect(() => {
    if (registerIsSuccess && registerResponse) {
      setError({ ...baseRegisterError })

      setCookie(USER_ACCESS_TOKEN, registerResponse.result.token)
      setCookie(USER_REFRESH_TOKEN, registerResponse.result.refresh_token)

      router.push('/dashboard')

      toast.success('Register Success', { position: 'top-right' })
    }
    if (registerIsError) {
      const err = registerError as { data: BaseResponse<RegisterError> }
      setError({ ...baseRegisterError, ...err.data.result })
    }
  }, [registerIsError, registerIsSuccess])

  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <Toaster />
      <div className='flex w-card-register flex-col justify-center gap-4 rounded p-5 shadow-md'>
        <h1 className='mb-10 self-center text-3xl font-bold text-blue-600'>Registrasi</h1>
        <div className='grid grid-cols-2 gap-2'>
          <InputComponent
            label='NIM'
            placeholder='masukan NIM'
            required
            id='nim'
            value={form.nim}
            helper={error.nim[0]}
            error={error.nim.length > 0}
            onChange={handleChange}
          />
          <InputComponent
            label='Nama Lengkap'
            placeholder='nama lengkap'
            required
            id='full_name'
            value={form.full_name}
            helper={error.full_name[0]}
            error={error.full_name.length > 0}
            onChange={handleChange}
          />
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <InputComponent
            label='Email Widyatama'
            placeholder='Masukan email'
            required
            helper={
              error.email.length > 0 ? (
                error.email[0]
              ) : (
                <>
                  Email menggunakan <b>@widyatama.ac.id</b>
                </>
              )
            }
            id='email'
            value={form.email}
            error={error.email.length > 0}
            onChange={handleChange}
          />
          <InputPasswordComponent
            label='Password'
            placeholder='Masukan Password'
            required
            id='password'
            value={form.password}
            error={error.password.length > 0}
            helper={error.password[0]}
            onChange={handleChange}
          />
        </div>
        <div className='grid grid-cols-2 gap-2'>
          {!listFacultyIsFetching && listFacultyIsSuccess && listFaculty ? (
            <ListboxComponent
              listData={convertToListboxOption<Faculty>(listFaculty?.result ?? [], 'xid', 'name')}
              label='Faculty'
              required
              id='faculty_xid'
              onChange={handleChangeListbox}
            />
          ) : (
            ''
          )}
          {!listProgramStudyIsFetching && listProgramStudyIsSuccess && listProgramStudy ? (
            <ListboxComponent
              listData={convertToListboxOption<ProgramStudy>(listProgramStudy?.result ?? [], 'xid', 'name')}
              label='Program Study'
              required
              id='study_program_xid'
              onChange={handleChangeListbox}
            />
          ) : (
            ''
          )}
        </div>
        <button
          className='btn-primary mt-4 w-full p-3'
          onClick={handleSubmit}
        >
          Registrasi
        </button>
        <span className='text-sm text-gray-500/80'>
          Sudah memiliki akun?{' '}
          <Link
            href='/login'
            className='link'
          >
            Masuk
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Register
