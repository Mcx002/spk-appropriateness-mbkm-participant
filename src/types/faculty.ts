import { BaseResponse, TimestampAndVersion } from '@/types/common'

export interface Faculty extends Readonly<TimestampAndVersion> {
  id: number
  name: string
}

export enum FacultyListSortBy {
  IdAsc = 'id|asc',
  IdDesc = 'id|desc',
  NameAsc = 'name|asc',
  NameDesc = 'name|desc',
  CreatedAtAsc = 'createdAt|asc',
  CreatedAtDesc = 'createdAt|desc',
}

export type FacultyListRequest = {
  name?: any
  order: FacultyListSortBy
  offset: number
  limit: number
}

export type FacultyResponse = BaseResponse<Faculty[]>
