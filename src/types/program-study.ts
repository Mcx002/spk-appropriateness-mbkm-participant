import { BaseResponse, TimestampAndVersion } from '@/types/common'

export interface ProgramStudy extends Readonly<TimestampAndVersion> {
  xid: string
  name: string
}

export type ProgramStudyListRequest = {
  name?: any
  faculty_xid?: string
  offset: number
  limit: number
}

export type ProgramStudyResponse = BaseResponse<ProgramStudy[]>
