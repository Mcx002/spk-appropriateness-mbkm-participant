import { DateTime } from 'luxon'
import React, { FC } from 'react'

import { TableTh } from '@/components/Table'

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
              <td>{val.status.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardListSubmission
