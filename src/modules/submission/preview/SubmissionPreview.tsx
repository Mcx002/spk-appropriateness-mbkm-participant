import { Dialog } from '@headlessui/react'
import { ChevronLeft, ChevronRight, Description, Info } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MouseEvent, useState } from 'react'

import Card, { CardBody, CardHead } from '@/components/Card'
import DashboardLayout from '@/layouts/Dashboard-layout'
import { SubmissionSteps } from '@/modules/submission/SubmissionSteps'

import TimeFast from '~/assets/icons/Icon_Time Fast.svg'

const SubmissionPreview = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsOpen(true)
  }
  return (
    <DashboardLayout title='Submission Preview'>
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
            <CardHead>Step 3 of 3</CardHead>
            <CardBody>
              <p className='text-xs text-[#464646]'>Lengkapi data Anda untuk mengajukan MBKM</p>
              <SubmissionSteps active={2} />
            </CardBody>
          </Card>
          <Card className='flex-1'>
            <CardHead className='flex justify-between'>
              <span>Mengirim Persyaratan Pengajuan</span>
            </CardHead>
            <CardBody className='body grid grid-cols-1 gap-2 p-6'>
              <h1 className='font-poppins font-bold text-primary'>Preview</h1>
              <div className='grid grid-cols-3 gap-2 text-xs leading-[22px] text-[#464646]'>
                <span className='title font-semibold'>NIM</span>
                <span className='value col-span-2'>2020987890</span>
                <span className='title font-semibold'>Nama Lengkap</span>
                <span className='value col-span-2'>Agus Purnomo</span>
                <span className='title font-semibold'>Email Widyatama</span>
                <span className='value col-span-2'>agusPurnomo@widyatama.ac.id</span>
                <span className='title font-semibold'>Program Studi</span>
                <span className='value col-span-2'>Teknik Informatika</span>
                <span className='title font-semibold'>Periode Masuk</span>
                <span className='value col-span-2'>2020/2021</span>
                <span className='title font-semibold'>Kelas</span>
                <span className='value col-span-2'>S1 Informatika - Reguler B2</span>
                <span className='title font-semibold'>Semester Aktif</span>
                <span className='value col-span-2'>Semester 8</span>
              </div>
              <h1 className='font-poppins font-bold text-primary'>Preview Dokumen</h1>
              <div className='grid grid-cols-1 gap-[11px]'>
                <div className='flex flex-row items-center gap-5 rounded-xl border p-2 px-7 text-[#464646]'>
                  <Description className='text-[#767676]' />
                  <span className='flex-1'>Transkrip Nilai.pdf</span>
                  <Link
                    href=''
                    className='btn btn-primary-light border'
                  >
                    Cek Detail
                  </Link>
                </div>
                <div className='flex flex-row items-center gap-5 rounded-xl border p-2 px-7 text-[#464646]'>
                  <Description className='text-[#767676]' />
                  <span className='flex-1'>FRS.pdf</span>
                  <Link
                    href=''
                    className='btn btn-primary-light border'
                  >
                    Cek Detail
                  </Link>
                </div>
                <div className='flex flex-row items-center gap-5 rounded-xl border p-2 px-7 text-[#464646]'>
                  <Description className='text-[#767676]' />
                  <span className='flex-1'>History Pembayaran.pdf</span>
                  <Link
                    href=''
                    className='btn btn-primary-light border'
                  >
                    Cek Detail
                  </Link>
                </div>
              </div>
              <div className='action mt-[55px] flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-3'>
                  <Info className='mat-icon-normal' />
                  <span className='text-[10px] text-[#393939]'>
                    Pastikan data Anda sudah sesuai, jika sudah dikirim tidak dapat diubah kembali
                  </span>
                </div>
                <div className='flex flex-row gap-[10px]'>
                  <Link
                    href='/dashboard'
                    className='btn btn-primary-light border'
                  >
                    Batal
                  </Link>
                  <button
                    className='btn btn-primary border'
                    type='submit'
                    onClick={handleSubmit}
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <div
            className='fixed inset-0 bg-black/30'
            aria-hidden='true'
          />
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <Dialog.Panel className='mx-auto flex w-[530px] flex-col items-center gap-[26px] rounded bg-white p-7 px-[54px]'>
                <Dialog.Title className='text-center text-2xl font-semibold'>Data Berhasil Terkirim</Dialog.Title>
                <Dialog.Description className='flex flex-col items-center gap-3'>
                  <TimeFast className='h-[141px] w-[141px]' />
                  <span className='text-center text-sm text-[#464646]'>
                    Data yang berhasil dikirim akan dicek kembali oleh pihak kampus. Mohon cek berkala untuk mendapatkan
                    informasi selanjutnya
                  </span>
                </Dialog.Description>

                <button
                  onClick={() => setIsOpen(false)}
                  className='btn btn-primary'
                >
                  OK
                </button>
              </Dialog.Panel>
            </div>
          </div>
        </div>
      </Dialog>
    </DashboardLayout>
  )
}

export default SubmissionPreview
