import { Tune } from '@mui/icons-material'
import { Autocomplete, TextField } from '@mui/material'
import { DateTime } from 'luxon'
import { router } from 'next/client'
import React, { FC, FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import { useUpdateEffect } from 'usehooks-ts'

import InputComponent from '@/components/InputComponent'
import MyPagination from '@/components/Pagination'
import { TableTh } from '@/components/Table'
import DashboardProdiLayout from '@/layouts/Dashboard-prodi-layout'
import { ListMeta } from '@/types/common'
import { GetSubmissionResponse, getSubmissionStatusName, SUBMISSION_STATUS_ENUM } from '@/types/submission'
import clsxm from '@/utils/clsxm'

import Banner from '~/assets/icons/Banner.png'
import FileNotFoundIcon from '~/assets/icons/file-not-found-icon.svg'
import SearchIcon from '~/assets/icons/search-icon.svg'
import { useLazyGetSubmissionsQuery } from '@/services/submissions'
import Link from 'next/link'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'

const Dashboard: FC = () => {
  const [getSubmissions, { data: submissionsData }] = useLazyGetSubmissionsQuery()
  const [submissions, setSubmissions] = useState<GetSubmissionResponse[]>([])
  const [dataCount, setDataCount] = useState(0)
  const [limit, setLimit] = useState(10)
  const [order, setOrder] = useState('created_at|desc')
  const [keyword, setKeyword] = useState('')

  const [listSubmissionMeta, setListSubmissionMeta] = useState<ListMeta>({
    limit: 10,
    offset: 0,
    total: 5,
    page: 1,
    pages: 1,
  })

  useEffect(() => {
    getSubmissions({
      params: {
        limit,
        offset: 0,
        order,
        period_id: 1,
      },
    })
  }, [])

  useUpdateEffect(() => {
    if (submissionsData) {
      setSubmissions(submissionsData.result)
      setDataCount(submissionsData.result.length)
      setListSubmissionMeta(submissionsData.meta as ListMeta)
    }
  }, [submissionsData])

  useEffect(() => {
    getSubmissions({
      params: {
        limit: limit,
        offset: listSubmissionMeta.offset,
        order,
        period_id: 1,
      },
    })
  }, [limit])

  useEffect(() => {
    getSubmissions({
      params: {
        limit: limit,
        offset: listSubmissionMeta.offset,
        order,
        period_id: 1,
      },
    })
  }, [order])

  const handlePageClick = (event: { offset: number }) => {
    getSubmissions({
      params: {
        limit: listSubmissionMeta.limit,
        offset: event.offset,
        order,
        period_id: 1,
      },
    })
  }

  const handleFilterSubmit = (e: FormEvent) => {
    e.preventDefault()
    getSubmissions({
      params: {
        limit,
        offset: listSubmissionMeta.offset,
        order,
        period_id: 1,
        keyword,
      },
    })
  }

  const handleLimitChange = (event: SyntheticEvent, newInputValue: string) => {
    setLimit(parseInt(newInputValue))
  }

  return (
    <DashboardProdiLayout title='Dashboard'>
      <div className='mb-[50px] grid w-full grid-cols-1 gap-8 px-4 pt-8 md:px-32'>
        <img
          src={Banner.src}
          alt='dashboard banner'
          className='h-full w-full object-contain'
        />
        <div className='grid grid-cols-1 gap-4'>
          <div className='title'>
            <h1 className='text-2xl font-bold'>
              Daftar Pengajuan
              {listSubmissionMeta.total > 0 && (
                <>
                  {' '}
                  (<span className='text-blue-700'>{listSubmissionMeta.total}</span>)
                </>
              )}
            </h1>
            <hr />
          </div>
          <div className='actions mt-2 flex flex-col flex-wrap justify-between gap-2 sm:flex-row'>
            <div className='left'>
              <form
                onSubmit={handleFilterSubmit}
                className='flex flex-row flex-wrap'
              >
                <InputComponent
                  placeholder='Search'
                  classNameDiv='flex-1'
                  className='w-full rounded border-gray-200 pr-12 text-xs lg:w-[420px]'
                  icon={<SearchIcon />}
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value)
                  }}
                />
                <button className='ml-2 flex flex-row items-center gap-1 rounded border border-gray-200 p-1.5 text-xs font-bold text-gray-700 duration-75 hover:bg-gray-100 active:bg-gray-300'>
                  <Tune className='mat-icon-sm' />
                  Filter
                </button>
              </form>
            </div>
            <div className='right flex flex-row items-center gap-5'>
              <span>Show</span>
              <Autocomplete
                disablePortal
                freeSolo
                id='combo-box-demo'
                className='!w-[80px] text-sm'
                disableClearable={true}
                options={['5', '10', '15']}
                getOptionLabel={(option) => option.toString() || ''}
                onInputChange={handleLimitChange}
                value={limit.toString()}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      type: 'number',
                      className: 'px-1 !py-0 text-field-no-outline',
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className='w-full overflow-hidden rounded text-sm'>
            {dataCount > 0 ? (
              <div className='flex flex-col gap-8'>
                <div className='overflow-x-scroll'>
                  <table className='table-custom w-full min-w-[583px]'>
                    <thead className='bg-gray-500 text-left'>
                      <tr className='bg-gray-500'>
                        <TableTh>No.</TableTh>
                        <TableTh
                          onClick={(e, order) => {
                            setOrder(`created_at|${order}`)
                          }}
                        >
                          Tanggal Pengajuan
                        </TableTh>
                        <TableTh
                          onClick={(e, order) => {
                            setOrder(`student.nim|${order}`)
                          }}
                        >
                          NIM
                        </TableTh>
                        <TableTh
                          onClick={(e, order) => {
                            setOrder(`student.name|${order}`)
                          }}
                        >
                          Nama Mahasiswa
                        </TableTh>
                        <TableTh
                          onClick={(e, order) => {
                            setOrder(`ipk|${order}`)
                          }}
                        >
                          IPK
                        </TableTh>
                        <TableTh
                          onClick={(e, order) => {
                            setOrder(`semester|${order}`)
                          }}
                        >
                          Semester
                        </TableTh>
                        <TableTh
                          onClick={(e, order) => {
                            setOrder(`status|${order}`)
                          }}
                        >
                          Status
                        </TableTh>
                        <TableTh>Aksi</TableTh>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((val, i) => (
                        <tr
                          key={i}
                          className='hover:bg-gray-100'
                        >
                          <td>{i + 1}</td>
                          <td>
                            {DateTime.fromFormat(val.created_at, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
                              .toFormat('dd-MM-yyyy HH:mm:ss')
                              .toString()}
                          </td>
                          <td>{val.student.nim}</td>
                          <td>{val.student.name}</td>
                          <td>{val.ipk}</td>
                          <td>{val.semester}</td>
                          <td>
                            <div className='flex justify-center md:justify-start'>
                              <div
                                className={clsxm(
                                  'w-fit rounded-2xl p-2 text-center',
                                  val.status === SUBMISSION_STATUS_ENUM.APPROVED && 'bg-[#C9FFD5] text-[#329C70]',
                                  val.status === SUBMISSION_STATUS_ENUM.REJECTED && 'bg-[#FFD6D6] text-[#EF5656]',
                                  val.status === SUBMISSION_STATUS_ENUM.SUBMITTED && 'bg-[#DFF7FF] text-[#415DF3]'
                                )}
                              >
                                {getSubmissionStatusName(val.status)}
                              </div>
                            </div>
                          </td>
                          <td>
                            <Link
                              href={`/prodi/submission/${val.id}`}
                              className='text-[#006BCD]'
                            >
                              <VisibilityOutlinedIcon />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className='flex justify-end'>
                  <MyPagination
                    onPageClick={handlePageClick}
                    limit={limit}
                    pages={listSubmissionMeta.pages}
                  />
                </div>
              </div>
            ) : (
              <div className='mt-8 flex w-full justify-center'>
                <div className='flex w-[277px] flex-col items-center'>
                  <FileNotFoundIcon className='h-[133px] w-[175px]' />
                  <div className='flex flex-col items-center text-center'>
                    <h1 className='font-montserrat font-bold'>Belum ada pengajuan MBKM</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardProdiLayout>
  )
}

export default Dashboard
