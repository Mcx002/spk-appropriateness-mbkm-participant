import { Add, Tune } from '@mui/icons-material'
import { DateTime } from 'luxon'
import React, { FC } from 'react'

import InputComponent from '@/components/InputComponent'
import Pagination from '@/components/Pagination'
import { TableTh } from '@/components/Table'
import DashboardLayout from '@/layouts/Dashboard-layout'

import Banner from '~/assets/icons/Banner.png'
import FileNotFoundIcon from '~/assets/icons/file-not-found-icon.svg'
import SearchIcon from '~/assets/icons/search-icon.svg'

const Dashboard: FC = () => {
  const data = {
    message: '',
    result: [
      {
        nim: '0619204001',
        name: 'Muchlish Choeruddin',
        semester: 7,
        status: {
          id: 3,
          name: 'Pending',
        },
        createdAt: 1679820616,
        updatedAt: 1679820616,
      },
      {
        nim: '0619204001',
        name: 'Muchlish Choeruddin',
        semester: 7,
        status: {
          id: 3,
          name: 'Pending',
        },
        createdAt: 1679820616,
        updatedAt: 1679820616,
      },
      {
        nim: '0619204001',
        name: 'Muchlish Choeruddin',
        semester: 7,
        status: {
          id: 3,
          name: 'Pending',
        },
        createdAt: 1679820616,
        updatedAt: 1679820616,
      },
      {
        nim: '0619204001',
        name: 'Muchlish Choeruddin',
        semester: 7,
        status: {
          id: 3,
          name: 'Pending',
        },
        createdAt: 1679820616,
        updatedAt: 1679820616,
      },
      {
        nim: '0619204001',
        name: 'Muchlish Choeruddin',
        semester: 7,
        status: {
          id: 3,
          name: 'Pending',
        },
        createdAt: 1679820616,
        updatedAt: 1679820616,
      },
    ],
    meta: {
      limit: 3,
      offset: 0,
      total: 60,
      page: 1,
      pages: 1,
    },
  }
  const dataCount = 1
  return (
    <DashboardLayout title='Dashboard'>
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
            <div className='right'>
              <button className='btn-primary float-right px-5 py-2 font-montserrat text-xs font-bold'>
                <Add className='mat-icon-normal' /> Pengajuan MBKM
              </button>
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
                        <TableTh>Semester</TableTh>
                        <TableTh>Status</TableTh>
                      </tr>
                    </thead>
                    <tbody>
                      {data.result.map((val, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{DateTime.fromSeconds(val.createdAt).toFormat('dd-MM-yyyy')}</td>
                          <td>{val.nim}</td>
                          <td>{val.name}</td>
                          <td>{val.semester}</td>
                          <td>{val.status.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  total={data.meta.total}
                  initialOffset={data.meta.offset}
                  limit={data.meta.limit}
                  onPageClick={(e) => {
                    console.log(e)
                  }}
                />
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
    </DashboardLayout>
  )
}

export default Dashboard
