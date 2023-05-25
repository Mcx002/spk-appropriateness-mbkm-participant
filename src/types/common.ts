export type BaseResponse<D> = {
  message: string
  result: D
  meta: unknown
}

export type ListMeta = {
  limit: number
  offset: number
  total: number
  page: number
  pages: number
}

export type TimestampAndVersion = {
  createdAt: number
  updatedAt: number
  version: number
}

export type FileType = {
  filename: string
  url?: string
}

export type ControlStatus = {
  id: number
  name: string
}

export type GetDetailRequest = {
  xid: string
}
