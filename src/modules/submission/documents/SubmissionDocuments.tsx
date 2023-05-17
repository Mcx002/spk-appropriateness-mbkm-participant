import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useSelector } from 'react-redux'

import Card, { CardBody, CardHead } from '@/components/Card'
import InputComponent from '@/components/InputComponent'
import DashboardLayout from '@/layouts/Dashboard-layout'
import { SubmissionSteps } from '@/modules/submission/SubmissionSteps'
import {
  getSubmissionFormGradesState,
  getSubmissionFormProfileState,
  getTempSubmissionDocumentsState,
} from '@/reducers/submission-form'

const Submission = () => {
  const router = useRouter()
  const profile = useSelector(getSubmissionFormProfileState)
  const grades = useSelector(getSubmissionFormGradesState)
  const documents = useSelector(getTempSubmissionDocumentsState)
  const [form, setForm] = useState(grades)
  const [formDocuments, setFormDocuments] = useState(documents)

  console.log(profile)
  const handleformDocuments = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const e = event as ChangeEvent<HTMLInputElement>
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormDocuments({
        ...formDocuments,
        [e.target.id]: file,
      })
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/submission/preview')
  }
  return (
    <DashboardLayout title='Upload Documents'>
      <div className='mt-[39px] grid grid-cols-1 gap-8 px-[140px]'>
        <div className='header flex flex-row gap-2'>
          <div
            onClick={router.back}
            className='cursor-pointer rounded-l border bg-white p-3 hover:bg-gray-100 active:bg-gray-200'
          >
            <ChevronLeft />
          </div>
          <div className='mt-1 flex flex-1 flex-col gap-2'>
            <div className='flex flex-row items-center justify-between'>
              <h1 className='font-montserrat text-[24px] font-bold'>Form Pengajuan</h1>
              <div className='breadcrumb flex flex-row items-center gap-[9px] font-poppins font-bold'>
                <Link
                  className='link'
                  href='/src/pages/dashboard'
                >
                  Beranda
                </Link>
                <ChevronRight className='text-lg' />
                <span className='text-[#A3A3A3]'>Form Pengajuan</span>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className='body flex flex-row gap-8'>
          <Card className='h-fit w-[320px]'>
            <CardHead>Step 2 of 3</CardHead>
            <CardBody>
              <p className='text-xs text-[#464646]'>Lengkapi data Anda untuk mengajukan MBKM</p>
              <SubmissionSteps active={1} />
            </CardBody>
          </Card>
          <Card className='h-fit flex-1'>
            <CardHead className='flex justify-between'>
              <span>Detail Mahasiswa</span>
              <span className='text-[10px] font-normal text-danger'>* Indicates required field</span>
            </CardHead>
            <CardBody className='body'>
              <form
                className='grid grid-cols-1 gap-6 p-6'
                onSubmit={handleSubmit}
              >
                <div className='grid grid-cols-2 gap-6'>
                  <div className='grid grid-cols-3 items-center gap-2'>
                    <span className='col-span-2'>Nilai Rekayasa Perangkat Lunak</span>
                    <InputComponent
                      className='w-[80px] rounded border-[#DFDFDF] text-[#464646]'
                      required
                      placeholder='0.00'
                      type='number'
                      id='so'
                      value={form.so}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='grid grid-cols-3 items-center gap-2'>
                    <span className='col-span-2'>Nilai Sistem Operasi</span>
                    <InputComponent
                      className='w-[80px] rounded border-[#DFDFDF] text-[#464646]'
                      required
                      placeholder='0.00'
                      type='number'
                      id='so'
                      value={form.so}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='grid grid-cols-3 items-center gap-2'>
                    <span className='col-span-2'>Nilai Jaringan komputer</span>
                    <InputComponent
                      className='w-[80px] rounded border-[#DFDFDF] text-[#464646]'
                      required
                      placeholder='0.00'
                      type='number'
                      id='nc'
                      value={form.nc}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='grid grid-cols-3 items-center gap-2'>
                    <span className='col-span-2'>Nilai Basis Data</span>
                    <InputComponent
                      className='w-[80px] rounded border-[#DFDFDF] text-[#464646]'
                      required
                      placeholder='0.00'
                      type='number'
                      id='db'
                      value={form.db}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='grid grid-cols-3 items-center gap-2'>
                    <span className='col-span-2'>Nilai Pengembangangan Aplikasi Berbasis Web</span>
                    <InputComponent
                      className='w-[80px] rounded border-[#DFDFDF] text-[#464646]'
                      required
                      placeholder='0.00'
                      type='number'
                      id='web'
                      value={form.web}
                      onChange={handleChange}
                    />
                  </div>
                  <InputComponent
                    classNameDiv='col-span-2'
                    className='h-min-[200px] w-full rounded border-[#DFDFDF] text-[#464646]'
                    label='Kesesuaian Capaian Pembelajaran'
                    labelClassName='text-black'
                    required
                    placeholder='Tambahkan detail deskripsi pekerjaan'
                    type='textarea'
                    id='jobdesc'
                    value={form.jobdesc}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h1 className='mt-6 mb-5 font-poppins text-base font-bold text-[#464646]'>
                    Unggah Dokumen Pendukung
                  </h1>
                  <hr />
                </div>
                <InputComponent
                  type='file'
                  label='Unggah Transkrip Nilai'
                  required
                  id='transcript'
                  placeholder='unggah file'
                  helper='format file .pdf'
                  onChange={handleformDocuments}
                  value={formDocuments.transcript?.name ?? ''}
                />
                <InputComponent
                  type='file'
                  label='Unggah FRS'
                  required
                  id='frs'
                  placeholder='unggah file'
                  helper='format file .pdf'
                  onChange={handleformDocuments}
                  value={formDocuments.frs?.name ?? ''}
                />
                {/*<input type='file' onChange={(e) => {console.log(e.target.files)}} />*/}
                <div className='action flex flex-row justify-end gap-6'>
                  <Link
                    href='/dashboard'
                    className='btn btn-primary-light border'
                  >
                    Batal
                  </Link>
                  <button
                    className='btn btn-primary border'
                    type='submit'
                  >
                    Selanjutnya
                  </button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Submission
