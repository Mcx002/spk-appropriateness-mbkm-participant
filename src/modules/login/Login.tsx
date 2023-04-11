import { getCookie, setCookie } from 'cookies-next'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import toast, { Toaster } from 'react-hot-toast'

import InputComponent from '@/components/InputComponent'
import InputPasswordComponent from '@/components/InputPasswordComponent'
import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN } from '@/config/token'
import { useLoginMutation, useRefreshTokenMutation } from '@/services/auth'
import { LoginError } from '@/types/auth'
import { BaseResponse } from '@/types/common'
import clsxm from '@/utils/clsxm'

import BgLogin from '~/assets/icons/bg_login.png'
import GoogleIcon from '~/assets/icons/google-login-button-icon.svg'

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

  const [
    refreshToken,
    {
      isLoading: refreshTokenIsLoading,
      isSuccess: refreshTokenIsSuccess,
      isError: refreshTokenIsError,
      error: refreshTokenError,
      data: refreshTokenResponse,
    },
  ] = useRefreshTokenMutation()

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login({ body: form })
  }

  useEffect(() => {
    if (getCookie(USER_ACCESS_TOKEN)) {
      router.push('/dashboard')
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

      setCookie(USER_ACCESS_TOKEN, loginResponse.result.token)
      setCookie(USER_REFRESH_TOKEN, loginResponse.result.refresh_token)

      router.push('/dashboard')

      toast.success('Login Success', { position: 'top-right' })
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
      <div className='col-span-12 flex justify-center lg:col-span-4'>
        <div className='w-400 w-450px rounded bg-white-card p-12 shadow-md'>
          <div className='grid grid-cols-1 gap-6'>
            <button className='flex w-full items-center justify-center space-x-3 rounded-md bg-white py-3 font-roboto text-base font-medium shadow-md transition-colors ease-in hover:bg-gray-100'>
              <GoogleIcon className='mr-3 h-7 w-7' />
              Continue with Google
            </button>
            <div className='relative mt-4 mb-2 flex items-center'>
              <div className='grow border-t border-gray-400' />
              <span className='mx-16 shrink text-sm text-gray-400'>Or</span>
              <div className='grow border-t border-gray-400' />
            </div>
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
                className={clsxm('w-full space-x-3 rounded-lg border-gray-300 py-4 px-7 font-poppins text-sm')}
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
                className='w-full space-x-3 rounded-lg border-gray-300 py-4 px-7 pr-14 font-poppins text-sm'
                onChange={handleChange}
                value={form.password}
              />
              <ReCAPTCHA sitekey='6LcpAUUlAAAAADRjGeq3HlghDuoDJHvJ2SCEXAhk' />
              <div className='full-width flex justify-between'>
                <div className='flex items-center gap-2 text-sm text-black/40'>
                  <input
                    type='checkbox'
                    className='rounded-sm'
                  />{' '}
                  Ingat saya
                </div>
                <a
                  href='#'
                  className='text-sm text-black/40'
                >
                  Forgot Password?
                </a>
              </div>
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
        </div>
      </div>
    </div>
  )
}

export default Login
