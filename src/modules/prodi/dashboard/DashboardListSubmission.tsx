import { DateTime } from 'luxon'
import React, { FC } from 'react'

import { TableTh } from '@/components/Table'
import clsxm from '@/utils/clsxm'

type User = {
  nim: string
  name: string
  semester: number
  status: {
    id: number
    name: string
  }
  createdAt: number
  updatedAt: number
}

type Props = {
  data: User[]
}

const DashboardListSubmission: FC<Props> = ({ data }) => {
  return (
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
          {data.map((val, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{DateTime.fromSeconds(val.createdAt).toFormat('dd-MM-yyyy')}</td>
              <td>{val.nim}</td>
              <td>{val.name}</td>
              <td>Semester {val.semester}</td>
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
  )
}

export default DashboardListSubmission
