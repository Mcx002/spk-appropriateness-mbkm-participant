import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import toast, { Toaster } from 'react-hot-toast'

import InputComponent from '@/components/InputComponent'
import InputPasswordComponent from '@/components/InputPasswordComponent'
import { useLoginMutation } from '@/services/auth'
import { LoginError } from '@/types/auth'
import { BaseResponse } from '@/types/common'
import clsxm from '@/utils/clsxm'

import BgLogin from '~/assets/icons/bg_login.png'
import GoogleIcon from '~/assets/icons/google-login-button-icon.svg'
import { CircularProgress } from '@mui/material'
import { getUserSession, setTokenSession, UserRole } from '@/utils/auth'

const Login: NextPage = () => {
  const router = useRouter()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const baseLoginError = {
    email: [],
    password: [],
  }

  const [error, setError] = useState<LoginError>(baseLoginError)

  const [
    login,
    {
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
      isError: loginIsError,
      error: loginError,
      data: loginResponse,
    },
  ] = useLoginMutation()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login({ body: form })
  }

  useEffect(() => {
    const user = getUserSession()
    if (user) {
      console.log(user)
      if (user.role === UserRole.Lecture) {
        router.push('/prodi/dashboard')
      }
      if (user.role === UserRole.Student) {
        router.push('/dashboard')
      }
    }
  })

  useEffect(() => {
    if (loginIsError) {
      const err = loginError as { data: BaseResponse<LoginError> } | undefined
      if (err && err.data && err.data.result) {
        setError({ ...baseLoginError, ...err.data.result })
        toast.error(err.data.message, { position: 'top-right' })
      } else {
        toast('make sure the service is running', { position: 'top-right' })
      }
    }
    if (loginIsSuccess && loginResponse) {
      setError({ ...baseLoginError })

      setTokenSession({
        accessToken: loginResponse.result.token,
        refreshToken: loginResponse.result.refresh_token,
        refreshTokenLifetime: loginResponse.result.refresh_token_lifetime,
      })

      toast.success('Login Sukses')
    }
  }, [loginIsError, loginIsSuccess])
  return (
    <div className='grid grid-cols-12 gap-5 pt-4 lg:pt-28'>
      <Head>
        <title>Login</title>
      </Head>
      <Toaster
        toastOptions={{
          className: 'text-sm',
        }}
      />
      <div className='col-span-12 flex flex-col items-center justify-center gap-4 lg:col-span-7'>
        <h1 className='font-bold text-heading-login'>WELCOME BACK</h1>
        <img
          src={BgLogin.src}
          className='hidden h-fit w-bg-login-width lg:block'
          alt=''
        />
      </div>
      <div className='col-span-12 flex items-center justify-center lg:col-span-4'>
        <div className='relative h-fit rounded bg-white-card p-12 shadow-md'>
          <div className='grid grid-cols-1 gap-6'>
            <form
              className='grid grid-cols-1 gap-6'
              onSubmit={handleLogin}
            >
              <InputComponent
                id='email'
                label='Email'
                type='email'
                placeholder='your.account@widyatama.ac.id'
                labelClassName='font-poppins text-base text-black/80'
                required
                showRequiredSymbol={false}
                helper={error.email[0]}
                error={error.email.length > 0}
                className={clsxm('w-full space-x-3 rounded-lg border-gray-300 px-7 py-4 font-poppins text-sm')}
                onChange={handleChange}
                value={form.email}
              />
              <InputPasswordComponent
                id='password'
                label='Password'
                placeholder='Kata sandi'
                labelClassName='font-poppins text-base text-black/80'
                required
                showRequiredSymbol={false}
                helper={error.password[0]}
                error={error.password.length > 0}
                className='w-full space-x-3 rounded-lg border-gray-300 px-7 py-4 pr-14 font-poppins text-sm'
                onChange={handleChange}
                value={form.password}
              />
              <button className='btn-primary relative flex w-full items-center justify-center text-base'>Masuk</button>
            </form>
            <div className='text-sm text-gray-500/80'>
              Belum memilliki akun?{' '}
              <Link
                href='/register'
                className='link'
              >
                Registrasi
              </Link>
            </div>
          </div>
          {loginIsLoading && (
            <div className='absolute left-0 top-0 flex !h-[100%] !w-[100%] items-center justify-center bg-white/70'>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
