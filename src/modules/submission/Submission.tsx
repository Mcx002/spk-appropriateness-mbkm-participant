import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'

import Card, { CardBody, CardHead } from '@/components/Card'
import DashboardLayout from '@/layouts/Dashboard-layout'
import { SubmissionSteps } from '@/modules/submission/SubmissionSteps'
import { SubmissionDocumentsState, SubmissionFormState } from '@/types/submission'

import SubmissionDocuments from './SubmissionDocuments'
import SubmissionPreview from './SubmissionPreview'
import SubmissionProfile from './SubmissionProfile'
import { useGetProfileQuery } from '@/services/user'

const Submission = () => {
  const router = useRouter()
  const [form, setForm] = useState<SubmissionFormState>({
    profile: {
      avatar: {
        filename: '',
      },
      nim: '',
      fullName: '',
      email: '',
      registerPeriod: '',
      class: '',
      activeSemester: '',
      prodi: {
        xid: '',
        name: '',
      },
    },
    grades: {
      se: 0,
      so: 0,
      nc: 0,
      db: 0,
      web: 0,
      jobdesc: '',
      ipk: 0,
      sks: 0,
    },
  })
  const { data: profileData } = useGetProfileQuery()

  const [documents, setDocuments] = useState<SubmissionDocumentsState>({
    avatar: null,
  })

  const [page, setPage] = useState(0)

  function handleSetPage(num: number) {
    setPage(num)
  }

  function handleSetDocuments(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const e = event as ChangeEvent<HTMLInputElement>
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setDocuments({
        ...documents,
        [e.target.id]: file,
      })
    }
  }

  function handleChangeProfile(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({
      ...form,
      profile: {
        ...form.profile,
        [e.target.id]: e.target.value,
      },
    })
  }

  function handleChangeGrades(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({
      ...form,
      grades: {
        ...form.grades,
        [e.target.id]: e.target.value,
      },
    })
  }

  function handleBackRoute() {
    switch (page) {
      case 0:
        router.push('/dashboard')
        break
      case 1:
        setPage(page - 1)
        break
      case 2:
        setPage(page - 1)
        break
    }
  }

  useEffect(() => {
    if (profileData) {
      const profile = profileData.result
      setForm({
        ...form,
        profile: {
          ...form.profile,
          fullName: profile.fullName,
          nim: profile.nim,
          email: profile.email,
          prodi: profile.studyProgram,
        },
      })
    }
  }, [profileData])

  return (
    <DashboardLayout title='Create Submission'>
      <div className='mt-[39px] grid grid-cols-1 gap-8 px-0 md:px-[140px]'>
        <div className='header flex flex-row gap-2'>
          <div
            onClick={handleBackRoute}
            className='cursor-pointer rounded-l border bg-white p-3 hover:bg-gray-100 active:bg-gray-200'
          >
            <ChevronLeft />
          </div>
          <div className='mt-1 flex flex-1 flex-col gap-2'>
            <div className='flex flex-row items-center justify-between'>
              <h1 className='font-montserrat text-[24px] font-bold'>Form Pengajuan</h1>
              <div className='breadcrumb hidden flex-row items-center gap-[9px] font-poppins font-bold md:flex'>
                <Link
                  className='link'
                  href='/dashboard'
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
        <div className='body flex flex-col gap-8 lg:flex-row'>
          <Card className='h-fit w-[100%] lg:w-[320px]'>
            <CardHead>Step 1 of 3</CardHead>
            <CardBody>
              <p className='text-xs text-[#464646]'>Lengkapi data Anda untuk mengajukan MBKM</p>
              <SubmissionSteps active={page} />
            </CardBody>
          </Card>
          <Card className='h-fit flex-1'>
            <CardHead className='flex justify-between'>
              <span>Detail Mahasiswa</span>
              <span className='text-[10px] font-normal text-danger'>* Indicates required field</span>
            </CardHead>
            <CardBody className='body grid grid-cols-1 gap-6 p-6'>
              {page === 0 ? (
                <SubmissionProfile
                  handleSetPage={handleSetPage}
                  handleChangeProfile={handleChangeProfile}
                  form={form.profile}
                  handleSetDocuments={handleSetDocuments}
                  documents={documents}
                />
              ) : page === 1 ? (
                <SubmissionDocuments
                  handleSetPage={handleSetPage}
                  handleChangeGrades={handleChangeGrades}
                  form={form.grades}
                />
              ) : page === 2 ? (
                <SubmissionPreview
                  form={form}
                  documents={documents}
                />
              ) : (
                ''
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Submission
