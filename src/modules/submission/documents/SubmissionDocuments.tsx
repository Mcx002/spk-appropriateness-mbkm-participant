import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

import Card, { CardBody, CardHead } from '@/components/Card'
import InputComponent from '@/components/InputComponent'
import DashboardLayout from '@/layouts/Dashboard-layout'
import { SubmissionSteps } from '@/modules/submission/SubmissionSteps'

const Submission = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    transkrip: {
      name: '',
      type: '',
      size: 0,
    },
    frs: {
      name: '',
      type: '',
      size: 0,
    },
    historyPembayaran: {
      name: '',
      type: '',
      size: 0,
    },
  })

  const handleImage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const e = event as ChangeEvent<HTMLInputElement>
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setForm({
        ...form,
        [e.target.id]: {
          name: file.name,
          type: file.type,
          size: file.size,
        },
      })
    }
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
          <Card className='flex-1'>
            <CardHead className='flex justify-between'>
              <span>Detail Mahasiswa</span>
              <span className='text-[10px] font-normal text-danger'>* Indicates required field</span>
            </CardHead>
            <CardBody className='body'>
              <form
                className='grid grid-cols-1 gap-6 p-6'
                onSubmit={handleSubmit}
              >
                <InputComponent
                  type='file'
                  label='Unggah Transkrip Nilai'
                  required
                  id='transkrip'
                  placeholder='unggah file'
                  helper='format file .pdf'
                  onChange={handleImage}
                  value={form.transkrip.name}
                />
                <InputComponent
                  type='file'
                  label='Unggah FRS'
                  required
                  id='frs'
                  placeholder='unggah file'
                  helper='format file .pdf'
                  onChange={handleImage}
                  value={form.frs.name}
                />
                <InputComponent
                  type='file'
                  label='Unggah History Pembayaran'
                  required
                  id='historyPembayaran'
                  placeholder='unggah file'
                  helper='format file .pdf'
                  onChange={handleImage}
                  value={form.historyPembayaran.name}
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
