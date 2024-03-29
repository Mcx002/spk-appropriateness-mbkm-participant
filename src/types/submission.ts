import { ProgramStudy } from '@/types/program-study'

import { BaseData, BaseResponse, ControlStatus, FileType } from './common'

export type SubmissionFormProfileState = {
  avatar: FileType
  nim: string
  fullName: string
  email: string
  registerPeriod: string
  class: string
  activeSemester: string
  prodi: Pick<ProgramStudy, 'id' | 'name'>
}

export type SubmissionFormGradesState = {
  /**
   * Software Engineer
   */
  se: number
  /**
   * System Operation
   */
  so: number
  /**
   * Network Computer
   */
  nc: number
  /**
   * Database
   */
  db: number
  /**
   * Web
   */
  web: number
  /**
   * Job Description
   */
  jobdesc: string
  ipk: number
  sks: number
}

export type SubmissionFormDocumentsState = {
  transcript: FileType
  frs: FileType
}

export type SubmissionType = {
  xid: string
  profile: SubmissionFormProfileState
  grades: SubmissionFormGradesState
  documents: SubmissionFormDocumentsState
  referenceLetter: string
  created_at: string
  status: ControlStatus
}

export type SubmissionFormState = Pick<SubmissionType, 'profile' | 'grades'>

export type SubmissionDocumentsState = {
  avatar: File | null
}

export type CreateSubmissionRequest = {
  profile: SubmissionFormProfileState
  grades: SubmissionFormGradesState
}

export type SubmissionResponse = BaseResponse<SubmissionFormState>

export type SubmissionDocumentResponse = {
  filename: string
  url: string
  etag: string
  size: number
  last_modified: string
}

export type GetMySubmissionRequest = {
  params: {
    limit: number
    offset: number
    order: string
  }
}
export interface IdName {
  id: number
  name: string
}

export interface ApprovedBy extends IdName {
  reason: string
}
export interface GetSubmissionResponse extends BaseData {
  created_by: IdName
  updated_by?: IdName
  deleted_by?: IdName
  period_id: number
  student_id: number
  entry_period: string
  semester: number
  class: string
  learning_achievement: string
  ipk: number
  total_sks: number
  achievement: number
  rpl: number
  jarkom: number
  sistem_operasi: number
  basis_data: number
  pengembangan_aplikasi_web: number
  status: SUBMISSION_STATUS_ENUM
  approved_by: ApprovedBy
  approved_at: string
  student: StudentDto
  recommendation_letter: GetDetailSubmissionDocumentResponse
}
export interface GetDetailSubmissionDocumentResponse {
  name: string
  url: string
  path: string
  context: string
  size: number
}
export interface GetDetailSubmissionResponse {
  detail: GetSubmissionResponse
  documents: GetDetailSubmissionDocumentResponse[]
}
export enum SUBMISSION_STATUS_ENUM {
  NEW = 'NEW',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ELIGIBLE = 'ELIGIBLE',
  NOT_ELIGIBLE = 'NOT_ELIGIBLE',
}

export const getSubmissionStatusName = (status: SUBMISSION_STATUS_ENUM) => {
  switch (status) {
    case SUBMISSION_STATUS_ENUM.APPROVED:
      return 'Pengajuan Diterima'
    case SUBMISSION_STATUS_ENUM.REJECTED:
      return 'Ditolak'
    case SUBMISSION_STATUS_ENUM.SUBMITTED:
      return 'Proses Review'
    case SUBMISSION_STATUS_ENUM.NEW:
      return 'Draft'
    case SUBMISSION_STATUS_ENUM.ELIGIBLE:
      return 'Layak'
    case SUBMISSION_STATUS_ENUM.NOT_ELIGIBLE:
      return 'Tidak Layak'
  }

  return ''
}

export type GetSubmissionRequest = {
  params: {
    limit: number
    offset: number
    order: string
    period_id: number
    keyword?: string
    status?: string
  }
}

export interface StudentDto extends BaseData {
  nim: number
  name: string
  email: string
  study_program_id: number
  studyProgram: StudyProgramDto
}

export interface StudyProgramDto {
  id: number
  name: string
  faculty_id: number
  is_active: boolean
}
