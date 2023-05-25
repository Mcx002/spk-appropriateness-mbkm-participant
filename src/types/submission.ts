import { BaseResponse, ControlStatus, FileType } from './common'
import { ProgramStudy } from '@/types/program-study'
import { Status } from '@jest/test-result'

export type SubmissionFormProfileState = {
  avatar: FileType
  nim: string
  fullName: string
  email: string
  registerPeriod: string
  class: string
  activeSemester: string
  prodi: Pick<ProgramStudy, 'xid' | 'name'>
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

export type GetSubmissionRequest = {
  params: {
    limit: number
    skip: number
  }
}
