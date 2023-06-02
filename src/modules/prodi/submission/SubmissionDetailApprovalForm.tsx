import { Description } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import { FC, useEffect, useState } from 'react'

import InputComponent from '@/components/InputComponent'
import { useLazyGetMyDocumentsQuery } from '@/services/submissions'
import { SubmissionType } from '@/types/submission'

type Props = {
  data: SubmissionType
}
const SubmissionDetailPreview: FC<Props> = ({ data }) => {
  const [frs, setFrs] = useState({
    filename: '',
    url: '',
  })
  const [transcript, setTrancript] = useState({
    filename: '',
    url: '',
  })
  const [appropriatenessJob, setAppropriatenessJob] = useState(0)

  const [
    getMyDocuments,
    {
      // isLoading: isGetMyDocumentLoading,
      // isError: isGetMyDocumentError,
      data: dataMyDocuments,
      error: errorMyDocuments,
    },
  ] = useLazyGetMyDocumentsQuery()
  useEffect(() => {
    if (dataMyDocuments) {
      for (const res of dataMyDocuments.result) {
        if (res.filename === 'frs.pdf') {
          setFrs(res)
        }
        if (res.filename === 'transcript.pdf') {
          setTrancript(res)
        }
      }
    }
  }, [dataMyDocuments])

  useEffect(() => {
    getMyDocuments({})
  }, [])

  return (
    <div className='grid grid-cols-1 gap-4'>
      <h1 className='font-poppins font-bold text-primary'>Preview</h1>
      <div className='grid grid-cols-3 gap-2 text-xs leading-[22px] text-[#464646]'>
        <span className='title font-semibold'>NIM</span>
        <span className='value col-span-2'>{data.profile.nim}</span>
        <span className='title font-semibold'>Nama Lengkap</span>
        <span className='value col-span-2'>{data.profile.fullName}</span>
        <span className='title font-semibold'>Email Widyatama</span>
        <span className='value col-span-2'>{data.profile.email}</span>
        <span className='title font-semibold'>Program Studi</span>
        <span className='value col-span-2'>{data.profile.prodi.name}</span>
        <span className='title font-semibold'>Periode Masuk</span>
        <span className='value col-span-2'>{data.profile.registerPeriod}</span>
        <span className='title font-semibold'>Kelas</span>
        <span className='value col-span-2'>{data.profile.class}</span>
        <span className='title font-semibold'>Semester Aktif</span>
        <span className='value col-span-2'>Semester {data.profile.activeSemester}</span>
      </div>
      <h1 className='font-poppins font-bold text-primary'>Persyaratan</h1>
      <div className='grid grid-cols-1 gap-4 text-xs text-[#464646] md:grid-cols-2'>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>IPK</span>
          <span>{data.grades.ipk}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Total SKS</span>
          <span>{data.grades.sks} SKS</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Rekayasa Perangkat Lunak</span>
          <span>{data.grades.se}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Sistem Operasi</span>
          <span>{data.grades.so}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Jaringan Komputer</span>
          <span>{data.grades.nc}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Basis Data</span>
          <span>{data.grades.db}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Pengembangan Aplikasi Berbasis Web</span>
          <span>{data.grades.web}</span>
        </div>
      </div>
      <InputComponent
        className='h-min-[200px] w-full rounded border-[#DFDFDF] text-sm text-[#464646]'
        label='Kesesuaian Capaian Pembelajaran'
        showRequiredSymbol={false}
        disabled={true}
        placeholder='Tambahkan detail deskripsi pekerjaan'
        type='textarea'
        id='jobdesc'
        value={data.grades.jobdesc}
      />
      <div className='grid grid-cols-1 gap-4 text-xs text-[#464646] md:grid-cols-2'>
        <div className='grid grid-cols-3 items-center gap-2'>
          <span className='col-span-2 font-bold'>Penilaian Kesesuaian deskripsi pekerjaan</span>
          <InputComponent
            className='w-[80px] rounded border-[#DFDFDF] text-xs text-[#464646]'
            required
            placeholder='0.00'
            type='number'
            id='se'
            value={appropriatenessJob}
            onChange={(e) => {
              setAppropriatenessJob(parseInt(e.target.value))
            }}
            min={0}
            max={4}
            step='0.01'
          />
        </div>
      </div>
      <h1 className='font-poppins font-bold text-primary'>Preview Dokumen</h1>
      <div className='grid grid-cols-1 gap-[11px]'>
        <div className='relative flex flex-row items-center gap-5 rounded-xl border p-2 px-7 text-[#464646]'>
          <Description className='text-[#767676]' />
          <span className='flex-1'>{data.documents.frs.filename}</span>
          <a
            href={data.documents.frs.url}
            target='_blank'
            className='btn btn-primary-light border px-4 text-xs md:px-9 md:text-sm'
          >
            Cek Detail
          </a>
          {/*
        frs.url === '' && (
            <div className='!absolute flex !h-[100%] !w-[100%] items-center justify-center bg-white/70'>
              <CircularProgress sx={{ color: '#ddd' }} />
            </div>
          )
        */}
        </div>
        <div className='relative flex flex-row items-center gap-5 rounded-xl border p-2 px-7 text-[#464646]'>
          <Description className='text-[#767676]' />
          <span className='flex-1'>{data.documents.transcript.filename}</span>
          <a
            href={data.documents.transcript.url}
            target='_blank'
            className='btn btn-primary-light border px-4 text-xs md:px-9 md:text-sm'
          >
            Cek Detail
          </a>
          {/*
        transcript.url === '' && (
            <div className='!absolute flex !h-[100%] !w-[100%] items-center justify-center bg-white/70'>
              <CircularProgress sx={{ color: '#ddd' }} />
            </div>
          )
        */}
        </div>
        {/*
      (frs.url === '' || transcript.url === '') && errorMyDocuments && (
          <div className='text-danger'>
            Failed to get documents.
            <a
              href='#'
              onClick={() => getMyDocuments({})}
              className='text-blue-500'
            >
              Try Again
            </a>
          </div>
        )
      */}
      </div>
      <div className='mt-6 flex flex-row justify-between'>
        <div>
          <button className='btn btn-primary-light border'>Batal</button>
        </div>
        <div className='flex gap-4'>
          <button className='btn btn-primary-light border'>Tolak</button>
          <button className='btn btn-primary border'>Terima</button>
        </div>
      </div>
    </div>
  )
}

export default SubmissionDetailPreview
