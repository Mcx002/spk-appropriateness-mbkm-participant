import { BaseResponse, TimestampAndVersion } from '@/types/common'

export interface ProgramStudy extends Readonly<TimestampAndVersion> {
  id: number
  name: string
}

export type ProgramStudyListRequest = {
  name?: any
  faculty_id?: number
  offset: number
  limit: number
}

export type ProgramStudyResponse = BaseResponse<ProgramStudy[]>
