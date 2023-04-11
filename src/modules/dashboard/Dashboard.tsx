import { Add } from '@mui/icons-material'
import { DateTime } from 'luxon'
import Link from 'next/link'
import React, { FC } from 'react'

import { TableTh } from '@/components/Table'
import DashboardLayout from '@/layouts/Dashboard-layout'

import Banner from '~/assets/icons/Banner.png'
import FileNotFoundIcon from '~/assets/icons/file-not-found-icon.svg'

const Dashboard: FC = () => {
  const data = [
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
  ]
  const dataCount = 0
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
            <div className='left flex flex-row flex-wrap'>{}</div>
            <div className='right'>
              <Link href='/submission/detail'>
                <button className='btn-primary float-right px-5 py-2 font-montserrat text-xs font-bold'>
                  <Add className='mat-icon-normal' /> Pengajuan MBKM
                </button>
              </Link>
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
                      {data.map((val, i) => (
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
                <div className='flex flex-row justify-end'>
                  <button className='btn-pagination'>{'<<'}</button>
                  <button className='btn-pagination'>{'<'}</button>
                  <button className='btn-pagination'>1</button>
                  <button className='btn-pagination'>2</button>
                  <button className='btn-pagination'>3</button>
                  <button className='btn-pagination'>...</button>
                  <button className='btn-pagination'>10</button>
                  <button className='btn-pagination'>{'>>'}</button>
                </div>
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
    </DashboardLayout>
  )
}

export default Dashboard
