import { Add } from '@mui/icons-material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Tooltip } from '@mui/material'
import { DateTime } from 'luxon'
import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import { useUpdateEffect } from 'usehooks-ts'

import MyPagination from '@/components/Pagination'
import { TableTh } from '@/components/Table'
import DashboardStudentLayout from '@/layouts/Dashboard-student-layout'
import { useGetOpenPeriodQuery } from '@/services/period'
import { useLazyGetMySubmissionsQuery } from '@/services/submissions'
import { ListMeta } from '@/types/common'
import { GetSubmissionResponse, getSubmissionStatusName, SUBMISSION_STATUS_ENUM } from '@/types/submission'
import clsxm from '@/utils/clsxm'

import Banner from '~/assets/icons/Banner.png'
import FileNotFoundIcon from '~/assets/icons/file-not-found-icon.svg'

const Dashboard: FC = () => {
  const { data: openPeriodData } = useGetOpenPeriodQuery()
  const [getSubmissions, { data: submissionsData }] = useLazyGetMySubmissionsQuery()
  const [submissions, setSubmissions] = useState<GetSubmissionResponse[]>([])
  const [dataCount, setDataCount] = useState(0)
  const limit = 10

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
        limit: limit,
        offset: 0,
        order: 'created_at|desc',
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
        limit: limit,
        offset: event.offset,
        order: 'created_at|desc',
      },
    })
  }

  return (
    <DashboardStudentLayout title='Dashboard'>
      <div className='mb-[100px] grid w-full grid-cols-1 gap-8 px-4 pt-8 md:px-32'>
        <img
          src={Banner.src}
          alt='dashboard banner'
          className='h-full w-full object-contain'
        />
        <div className='grid grid-cols-1 gap-8'>
          <div className='title flex justify-between'>
            <h1 className='text-2xl font-bold'>Daftar Pengajuan</h1>
            {openPeriodData ? (
              <Link href='/submission'>
                <button className='btn-primary float-right px-5 py-2 font-montserrat text-xs font-bold'>
                  <Add className='mat-icon-normal' /> Pengajuan MBKM
                </button>
              </Link>
            ) : (
              <button className='btn cursor-default bg-gray-200 px-5 py-2 font-montserrat text-xs font-bold text-gray-500'>
                Tidak ada periode yang dibuka
              </button>
            )}
          </div>
          <div className='w-full overflow-hidden rounded-xl text-sm'>
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
                        <TableTh
                          onClick={(e, order) => {
                            console.log(order)
                          }}
                        >
                          Semester
                        </TableTh>
                        <TableTh>
                          <div className='w-[100%] text-center'>Status</div>
                        </TableTh>
                        <TableTh>Aksi</TableTh>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((val, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>
                            {DateTime.fromFormat(val.created_at, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
                              .toFormat('dd-MM-yyyy HH:mm:ss')
                              .toString()}
                          </td>
                          <td>Semester {val.semester}</td>
                          <td className='align-middle'>
                            <div className='flex justify-center'>
                              <div
                                className={clsxm(
                                  'w-fit rounded-2xl p-2 text-center',
                                  val.status === SUBMISSION_STATUS_ENUM.APPROVED && 'bg-[#C9FFD5] text-[#329C70]',
                                  val.status === SUBMISSION_STATUS_ENUM.REJECTED && 'bg-[#FFD6D6] text-[#EF5656]',
                                  val.status === SUBMISSION_STATUS_ENUM.SUBMITTED && 'bg-[#DFF7FF] text-[#415DF3]',
                                  val.status === SUBMISSION_STATUS_ENUM.NEW && 'bg-gray-200 text-gray-500'
                                )}
                              >
                                {getSubmissionStatusName(val.status)}
                              </div>
                            </div>
                          </td>
                          <td className='flex items-center justify-center gap-2'>
                            {val.status !== SUBMISSION_STATUS_ENUM.NEW && (
                              <Tooltip title='Detail Pengajuan'>
                                <Link
                                  href={`/submission/${val.id}`}
                                  className='text-[#006BCD]'
                                >
                                  <VisibilityOutlinedIcon />
                                </Link>
                              </Tooltip>
                            )}
                            {val.status === SUBMISSION_STATUS_ENUM.APPROVED && (
                              <Tooltip title='Download Surat Rekomendasi'>
                                <Link
                                  href='#TODO:implement-recomendation-letter'
                                  target='_blank'
                                  className='text-[#3EAB84]'
                                >
                                  <FileDownloadOutlinedIcon />
                                </Link>
                              </Tooltip>
                            )}
                            {val.status === SUBMISSION_STATUS_ENUM.NEW && (
                              <Tooltip title='Lanjutkan Pengajuan'>
                                <Link
                                  href={`/submission/${val.id}/edit`}
                                  className='text-[#006BCD]'
                                >
                                  <EditOutlinedIcon />
                                </Link>
                              </Tooltip>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {listSubmissionMeta.pages > 1 && (
                  <div className='flex justify-end'>
                    <MyPagination
                      onPageClick={handlePageClick}
                      limit={limit}
                      pages={listSubmissionMeta.pages}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className='mt-8 flex w-full justify-center'>
                <div className='flex w-[277px] flex-col items-center'>
                  <FileNotFoundIcon className='h-[133px] w-[175px]' />
                  <div className='flex flex-col items-center text-center'>
                    <h1 className='font-montserrat font-bold'>Anda belum mengajukan MBKM</h1>
                    <p className='text-xs text-gray-500'>Untuk mengajukan persyaratan klik tombol pengajuan MBKM</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardStudentLayout>
  )
}

export default Dashboard
