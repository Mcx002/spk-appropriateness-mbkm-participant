import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FileType } from '@/types/common'

export type SubmissionFormProfileState = {
  avatar: FileType
  nim: string
  fullName: string
  email: string
  registerPeriod: string
  class: string
  activeSemester: string
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
}

export type SubmissionFormDocumentsState = {
  transcript: FileType
  frs: FileType
}

export type TemporarySubmissionDocumentsState = {
  transcript?: File
  frs?: File
}

export type SubmissionFormState = {
  profile: SubmissionFormProfileState
  grades: SubmissionFormGradesState
  documents: SubmissionFormDocumentsState
  tempDocuments: TemporarySubmissionDocumentsState
  isLoading: boolean
}

export type SubmissionFormStates = {
  submissionForm: SubmissionFormState
}

const initialState: SubmissionFormState = {
  profile: {
    avatar: {
      fileName: '',
    },
    nim: '',
    fullName: '',
    email: '',
    registerPeriod: '',
    class: '',
    activeSemester: '',
  },
  grades: {
    se: 0,
    so: 0,
    nc: 0,
    db: 0,
    web: 0,
    jobdesc: '',
  },
  documents: {
    transcript: {
      fileName: '',
    },
    frs: {
      fileName: '',
    },
  },
  tempDocuments: {},
  isLoading: false,
}

export const submissionFormReducer = createSlice({
  name: 'submission-form',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading
    },
    clearData: (state) => {
      state.profile = {
        avatar: {
          fileName: '',
        },
        nim: '',
        fullName: '',
        email: '',
        registerPeriod: '',
        class: '',
        activeSemester: '',
      }
      state.grades = {
        se: 0,
        so: 0,
        nc: 0,
        db: 0,
        web: 0,
        jobdesc: '',
      }
      state.documents = {
        transcript: {
          fileName: '',
        },
        frs: {
          fileName: '',
        },
      }
      state.tempDocuments = {}
      state.isLoading = false
    },
    setProfile: (state, action: PayloadAction<SubmissionFormProfileState>) => {
      state.profile = action.payload
    },
    setRequirements: (state, action: PayloadAction<SubmissionFormState>) => {
      state.grades = action.payload.grades
      state.documents = action.payload.documents
    },
  },
})

export const {
  clearData: submissionClearData,
  setProfile: submissionSetProfile,
  setRequirements: submissionSetRequirements,
} = submissionFormReducer.actions

export const getSubmissionFormProfileState = (state: SubmissionFormStates) => state.submissionForm.profile
export const getSubmissionFormGradesState = (state: SubmissionFormStates) => state.submissionForm.grades
export const getSubmissionFormDocumentsState = (state: SubmissionFormStates) => state.submissionForm.documents
export const getTempSubmissionDocumentsState = (state: SubmissionFormStates) => state.submissionForm.tempDocuments

export default submissionFormReducer.reducer
