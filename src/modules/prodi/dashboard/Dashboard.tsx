import { Add, Tune } from '@mui/icons-material'
import { DateTime } from 'luxon'
import React, { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from 'react'

import InputComponent from '@/components/InputComponent'
import Pagination from '@/components/Pagination'
import { TableTh } from '@/components/Table'
import DashboardLayout from '@/layouts/Dashboard-layout'

import Banner from '~/assets/icons/Banner.png'
import FileNotFoundIcon from '~/assets/icons/file-not-found-icon.svg'
import SearchIcon from '~/assets/icons/search-icon.svg'
import DashboardProdiLayout from '@/layouts/Dashboard-prodi-layout'
import clsxm from '@/utils/clsxm'
import { useLazyGetSubmissionsQuery } from '@/services/submissions'
import { useUpdateEffect } from 'usehooks-ts'
import { ListMeta } from '@/types/common'
import { SubmissionType } from '@/types/submission'
import MyPagination from '@/components/Pagination'
import { Autocomplete, TextField } from '@mui/material'
import { router } from 'next/client'

const Dashboard: FC = () => {
  const [getSubmissions, { data: submissionsData }] = useLazyGetSubmissionsQuery()
  const [submissions, setSubmissions] = useState<SubmissionType[]>([])
  const [dataCount, setDataCount] = useState(0)

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
        limit: 10,
        skip: 0,
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

  const handlePageClick = (event: { offset: number }) => {
    getSubmissions({
      params: {
        limit: 10,
        skip: event.offset,
      },
    })
  }

  const handleLimitChange = (event: SyntheticEvent, newInputValue: string) => {
    getSubmissions({
      params: {
        limit: parseInt(newInputValue),
        skip: listSubmissionMeta.offset,
      },
    })
  }

  return (
    <DashboardProdiLayout title='Dashboard'>
      <div className='grid w-full grid-cols-1 gap-8 px-4 pt-8 md:px-32'>
        <img
          src={Banner.src}
          alt='dashboard banner'
          className='h-full w-full object-contain'
        />
        <div className='grid grid-cols-1 gap-4'>
          <div className='title'>
            <h1 className='text-2xl font-bold'>
              Daftar Pengajuan
              {dataCount > 0 && (
                <>
                  {' '}
                  (<span className='text-blue-700'>{dataCount}</span>)
                </>
              )}
            </h1>
            <hr />
          </div>
          <div className='actions mt-9 flex flex-col flex-wrap justify-between gap-2 sm:flex-row'>
            <div className='left flex flex-row flex-wrap'>
              <InputComponent
                placeholder='Search'
                classNameDiv='flex-1'
                className='w-full rounded border-gray-200 pr-12 text-xs lg:w-[420px]'
                icon={<SearchIcon />}
              />
              <button className='ml-2 flex flex-row items-center gap-1 rounded border border-gray-200 p-1.5 text-xs font-bold text-gray-700 duration-75 hover:bg-gray-100 active:bg-gray-300'>
                <Tune className='mat-icon-sm' />
                Filter
              </button>
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
                            console.log(order)
                          }}
                        >
                          Tanggal Pengajuan
                        </TableTh>
                        <TableTh>NIM</TableTh>
                        <TableTh>Nama Mahasiswa</TableTh>
                        <TableTh>IPK</TableTh>
                        <TableTh>Semester</TableTh>
                        <TableTh>Status</TableTh>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((val, i) => (
                        <tr
                          key={i}
                          className='cursor-pointer hover:bg-gray-100 active:bg-gray-200'
                          onClick={() => router.push(`/prodi/submission/${val.xid}`)}
                        >
                          <td>{i + 1}</td>
                          <td>
                            {DateTime.fromFormat(val.created_at, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
                              .toFormat('dd-MM-yyyy HH:mm:ss')
                              .toString()}
                          </td>
                          <td>{val.profile.nim}</td>
                          <td>{val.profile.fullName}</td>
                          <td>{val.grades.ipk}</td>
                          <td>{val.profile.activeSemester}</td>
                          <td>
                            <div className='flex justify-center md:justify-start'>
                              <div
                                className={clsxm(
                                  'w-fit rounded-2xl p-2 text-center',
                                  val.status.id === 1 && 'bg-[#C9FFD5] text-[#329C70]',
                                  val.status.id === 2 && 'bg-[#FFD6D6] text-[#EF5656]',
                                  val.status.id === 3 && 'bg-[#DFF7FF] text-[#415DF3]'
                                )}
                              >
                                {val.status.name}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className='flex justify-end'>
                  <MyPagination
                    onPageClick={handlePageClick}
                    limit={10}
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
