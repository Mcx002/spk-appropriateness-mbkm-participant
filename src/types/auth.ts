import { BaseResponse } from '@/types/common'

export type Auth = {
  token: string
  refresh_token: string
  refresh_token_lifetime: number
}

export type RegisterError = {
  nim: string[]
  full_name: string[]
  email: string[]
  password: string[]
  faculty_xid: string[]
  study_program_xid: string[]
}

export type RegisterRequest = {
  body: {
    nim: string
    full_name: string
    email: string
    password: string
    faculty_xid: string
    study_program_xid: string
  }
}

export type LoginError = {
  email: string[]
  password: string[]
}

export type LoginRequest = {
  body: {
    email: string
    password: string
  }
}

export type RefreshTokenRequest = {
  body: {
    refresh_token: string
  }
}

export type AuthResponse = BaseResponse<Auth>
