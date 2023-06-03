import { Faculty } from '@/types/faculty'
import { ProgramStudy } from '@/types/program-study'

export type User = {
  nim: string
  fullName: string
  email: string
  faculty: Pick<Faculty, 'id' | 'name'>
  studyProgram: Pick<ProgramStudy, 'id' | 'name'>
}
