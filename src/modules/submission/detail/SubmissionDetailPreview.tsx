import { Description } from '@mui/icons-material'
import { FC, useEffect, useState } from 'react'

import InputComponent from '@/components/InputComponent'
import { useLazyGetMyDocumentsQuery } from '@/services/submissions'
import { GetDetailSubmissionResponse } from '@/types/submission'

type Props = {
  data: GetDetailSubmissionResponse
}
const SubmissionDetailPreview: FC<Props> = ({ data }) => {
  const [_frs, setFrs] = useState({
    filename: '',
    url: '',
  })
  const [_transcript, setTrancript] = useState({
    filename: '',
    url: '',
  })

  const [
    getMyDocuments,
    {
      // isLoading: isGetMyDocumentLoading,
      // isError: isGetMyDocumentError,
      data: dataMyDocuments,
      error: _errorMyDocuments,
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
    <>
      <h1 className='font-poppins font-bold text-primary'>Preview</h1>
      <div className='grid grid-cols-3 gap-2 text-xs leading-[22px] text-[#464646]'>
        <span className='title font-semibold'>NIM</span>
        <span className='value col-span-2'>{data.detail.student_id}</span>
        <span className='title font-semibold'>Nama Lengkap</span>
        <span className='value col-span-2'>{data.detail.created_by.name}</span>
        <span className='title font-semibold'>Email Widyatama</span>
        <span className='value col-span-2'>{data.detail.student.email}</span>
        <span className='title font-semibold'>Program Studi</span>
        <span className='value col-span-2'>{data.detail.student.studyProgram.name}</span>
        <span className='title font-semibold'>Periode Masuk</span>
        <span className='value col-span-2'>{data.detail.entry_period}</span>
        <span className='title font-semibold'>Kelas</span>
        <span className='value col-span-2'>{data.detail.class}</span>
        <span className='title font-semibold'>Semester Aktif</span>
        <span className='value col-span-2'>Semester {data.detail.semester}</span>
      </div>
      <h1 className='font-poppins font-bold text-primary'>Persyaratan</h1>
      <div className='grid grid-cols-1 gap-4 text-xs text-[#464646] md:grid-cols-2'>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>IPK</span>
          <span>{data.detail.ipk}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Total SKS</span>
          <span>{data.detail.total_sks} SKS</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Rekayasa Perangkat Lunak</span>
          <span>{data.detail.rpl}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Sistem Operasi</span>
          <span>{data.detail.sistem_operasi}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Jaringan Komputer</span>
          <span>{data.detail.jarkom}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Basis Data</span>
          <span>{data.detail.basis_data}</span>
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Nilai Pengembangan Aplikasi Berbasis Web</span>
          <span>{data.detail.pengembangan_aplikasi_web}</span>
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
        value={data.detail.learning_achievement}
      />
      <div className='grid grid-cols-1 gap-4 text-xs text-[#464646] md:grid-cols-2'>
        <div className='grid grid-cols-3 gap-2'>
          <span className='col-span-2 font-bold'>Penilaian Kesesuaian deskripsi pekerjaan</span>
          <span>{data.detail.achievement}</span>
        </div>
      </div>
      <h1 className='font-poppins font-bold text-primary'>Preview Dokumen</h1>
      <div className='grid grid-cols-1 gap-[11px]'>
        {data.documents.map((val, i) => (
          <div
            key={i}
            className='flex flex-row items-center gap-5 rounded-xl border p-2 px-7 text-[#464646]'
          >
            <Description className='text-[#767676]' />
            <span className='flex-1'>{val.name}</span>
            <a
              href={val.url}
              target='_blank'
              className='btn btn-primary-light border px-4 text-xs md:px-9 md:text-sm'
            >
              Cek Detail
            </a>
          </div>
        ))}
      </div>
    </>
  )
}

export default SubmissionDetailPreview
