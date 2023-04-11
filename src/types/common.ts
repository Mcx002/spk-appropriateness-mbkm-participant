export type BaseResponse<D> = {
  message: string
  result: D
  meta: string
}

export type TimestampAndVersion = {
  createdAt: number
  updatedAt: number
  version: number
}
