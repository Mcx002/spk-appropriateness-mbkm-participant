import { BaseData } from '@/types/common'
import { IdName, SUBMISSION_STATUS_ENUM } from '@/types/submission'

export interface PeriodDto extends BaseData {
  created_by: IdName
  updated_by?: IdName
  deleted_by?: IdName
  name: string
  status: PERIOD_STATUS_ENUM
  start_date: string
  end_date: string
}

export enum PERIOD_STATUS_ENUM {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export const getPeriodStatusName = (status: PERIOD_STATUS_ENUM) => {
  switch (status) {
    case PERIOD_STATUS_ENUM.OPEN:
      return 'Dibuka'
    case PERIOD_STATUS_ENUM.CLOSED:
      return 'Ditutup'
  }

  return ''
}

export type GetPeriodRequest = {
  params: {
    limit: number
    offset: number
    order: string
  }
}

export type SpkCriteriaDto = {
  name: string
  score: number
}

export interface SpkResponse {
  id: number
  period_id: number
  nim: string
  name: string
  rank: number
  preference_value: number
  criteria: SpkCriteriaDto[]
  processed_by: {
    id: number
    name: string
  }
  processed_at: string
}

export interface GetSpkResultRequest {
  periodId: number
  params: {
    limit: number
    offset: number
    order: string
  }
}
