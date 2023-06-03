import { BaseData } from '@/types/common'
import { IdName } from '@/types/submission'

export interface PeriodResponse extends BaseData {
  created_by: IdName
  updated_by?: IdName
  deleted_by?: IdName
  name: string
  status: string
  open_start_date: string
  open_end_date: string
  review_start_date: string
  review_end_date: string
}
