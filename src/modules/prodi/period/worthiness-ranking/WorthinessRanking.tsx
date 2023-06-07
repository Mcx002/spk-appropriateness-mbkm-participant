import { Dialog } from '@headlessui/react'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { Autocomplete, TextField } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent, SyntheticEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import InputComponent from '@/components/InputComponent'
import MyPagination from '@/components/Pagination'
import { TableTh } from '@/components/Table'
import DashboardProdiLayout from '@/layouts/Dashboard-prodi-layout'
import { useLazyGetDetailPeriodQuery, useLazyGetSpkResultQuery } from '@/services/period'
import { CommonError } from '@/types/common'
import { PeriodDto, SpkResponse } from '@/types/period'
import { SUBMISSION_STATUS_ENUM } from '@/types/submission'
import clsxm from '@/utils/clsxm'

import FileNotFoundIcon from '~/assets/icons/file-not-found-icon.svg'

const WorthinessRanking = () => {
  const router = useRouter()
  const periodId = router.query.periodId as string

  // services
  const [getSpkResult, { data: spkResult, error: spkResultError }] = useLazyGetSpkResultQuery()
  const [getDetailPeriod, { data: detailPeriod, error: detailPeriodError }] = useLazyGetDetailPeriodQuery()

  // State
  const [listSpk, setListSpk] = useState<SpkResponse[]>([])
  const [period, setPeriod] = useState<PeriodDto | null>(null)
  const [keyword, setKeyword] = useState('')
  const [order, setOrder] = useState('')
  const [listSubmissionMeta, setListSubmissionMeta] = useState({
    limit: 10,
    offset: 0,
    total: 5,
    page: 1,
    pages: 1,
  })
  const [isRejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [rejectedReason, setRejectedReason] = useState('')

  // Effects
  useEffect(() => {
    getSpkResult({
      periodId: parseInt(periodId),
      params: {
        limit: listSubmissionMeta.limit,
        offset: listSubmissionMeta.offset,
        order,
      },
    })
    getDetailPeriod(periodId)
  }, [])

  useEffect(() => {
    if (spkResult) {
      setListSpk(spkResult.result)
    }
  }, [spkResult])

  useEffect(() => {
    if (detailPeriod) {
      setPeriod(detailPeriod.result)
    }
    if (detailPeriodError) {
      toast.error((detailPeriodError as CommonError).data.message)
    }
  }, [detailPeriod, detailPeriodError])

  useEffect(() => {
    if (spkResultError) {
      toast.error('Gagal mengambil hasil spk')
    }
  }, [spkResultError])

  useEffect(() => {
    getSpkResult({
      periodId: parseInt(periodId),
      params: {
        limit: listSubmissionMeta.limit,
        offset: listSubmissionMeta.offset,
        order,
      },
    })
  }, [order, listSubmissionMeta])

  // handle function
  const handleLimitChange = (event: SyntheticEvent, newInputValue: string) => {
    setListSubmissionMeta({ ...listSubmissionMeta, limit: parseInt(newInputValue) })
  }

  const handlePageClick = (e: { offset: number }) => {
    setListSubmissionMeta({
      ...listSubmissionMeta,
      offset: e.offset,
    })
    getSpkResult({
      periodId: parseInt(periodId),
      params: {
        limit: listSubmissionMeta.limit,
        offset: e.offset,
        order,
      },
    })
  }

  const handleFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleProceedSubmission = (status: SUBMISSION_STATUS_ENUM) => {
    console.log(status)
  }

  return (
    <DashboardProdiLayout title='Hasil SPK'>
      <div className='mb-[50px] grid w-full grid-cols-1 gap-8 px-4 pt-8 md:px-32'>
        <div className='grid grid-cols-1 gap-4'>
          <div className='flex flex-row gap-2'>
            <div
              onClick={() => {
                router.back()
              }}
              className='cursor-pointer rounded-l border bg-white p-3 hover:bg-gray-100 active:bg-gray-200'
            >
              <ChevronLeft />
            </div>
            <div className='mt-1 flex flex-1 flex-col gap-2'>
              <div className='flex flex-row items-center justify-between'>
                <h1 className='font-montserrat text-[24px] font-bold'>Hasil SPK</h1>
                <div className='breadcrumb hidden flex-row items-center gap-[9px] font-poppins font-bold md:flex'>
                  <Link
                    className='link'
                    href='/prodi/dashboard'
                  >
                    Beranda
                  </Link>
                  <ChevronRight className='text-lg' />
                  <span className='text-[#A3A3A3]'>Hasil SPK</span>
                </div>
              </div>
              <hr />
            </div>
          </div>
          <div className='actions mt-2 flex flex-col flex-wrap justify-between gap-2 sm:flex-row'>
            <div className='left flex items-center'>
              <span className='italic text-[#929292]'>{period?.name ?? ''}</span>
            </div>
            <div className='right flex flex-row items-center gap-5'>
              <span>Show</span>
              <Autocomplete
                disablePortal
                freeSolo
                id='combo-box-demo'
                className='!w-[80px] text-sm'
                disableClearable={true}
                options={['5', '10', '15']}
                getOptionLabel={(option) => option.toString() || ''}
                onInputChange={handleLimitChange}
                value={listSubmissionMeta.limit.toString()}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      type: 'number',
                      className: 'px-1 !py-0 text-field-no-outline',
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className='w-full overflow-hidden rounded text-sm'>
            {listSpk.length > 0 ? (
              <div className='flex flex-col gap-8'>
                <div className='overflow-x-scroll'>
                  <table className='table-custom w-full min-w-[583px]'>
                    <thead className='bg-gray-500 text-left'>
                      <tr className='bg-gray-500'>
                        <TableTh>No.</TableTh>
                        <TableTh
                          onClick={(e, order) => {
                            setOrder(`nim|${order}`)
                          }}
                        >
                          NIM
                        </TableTh>
                        <TableTh
                          onClick={(e, order) => {
                            setOrder(`name|${order}`)
                          }}
                        >
                          Nama Mahasiswa
                        </TableTh>
                        <TableTh>IPK</TableTh>
                        <TableTh>Nilai Preferensi</TableTh>
                        <TableTh>
                          <div className='w-[100%] text-center'>Aksi</div>
                        </TableTh>
                      </tr>
                    </thead>
                    <tbody>
                      {listSpk.map((val, i) => (
                        <tr
                          key={i}
                          className='hover:bg-gray-100'
                        >
                          <td>{i + 1}</td>
                          <td>{val.nim}</td>
                          <td>{val.name}</td>
                          <td>{val.criteria[0].score}</td>
                          <td>{val.preference_value.toFixed(2)}</td>
                          <td className='flex justify-center gap-2'>
                            <button
                              className='rounded-2xl bg-[#FFC6BA] px-[8px] py-[5px] text-[#EB440F] active:bg-[#f5ae9f]'
                              onClick={() => setRejectDialogOpen(true)}
                            >
                              Tidak Layak
                            </button>
                            <button className='rounded-2xl bg-[#C9FFD5] px-[8px] py-[5px] text-[#329C70] active:bg-[#adedbb]'>
                              Layak
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className='flex justify-end'>
                  <MyPagination
                    onPageClick={handlePageClick}
                    limit={listSubmissionMeta.limit}
                    pages={listSubmissionMeta.pages}
                  />
                </div>
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
      <Dialog
        open={isRejectDialogOpen}
        onClose={() => {
          setRejectDialogOpen(false)
        }}
      >
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            className='fixed inset-0 bg-black/30'
            aria-hidden='true'
          />
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <Dialog.Panel className='mx-auto flex w-[530px] flex-col items-center gap-[26px] rounded bg-white p-7 px-[54px]'>
                <Dialog.Title className='text-center text-2xl font-semibold'>Apakah anda yakin?</Dialog.Title>
                <div className='grid w-[100%] grid-cols-1 gap-2'>
                  <Dialog.Description>Mohon masukan alasan penolakan</Dialog.Description>
                  <InputComponent
                    type='textarea'
                    className={clsxm('w-[100%] rounded border-gray-300', false && ' !border-danger')}
                    value={rejectedReason}
                    onChange={(e) => {
                      setRejectedReason(e.target.value)
                    }}
                  />
                  <div className='flex flex-row justify-end gap-3'>
                    <button
                      className='btn btn-primary-light border'
                      onClick={() => setRejectDialogOpen(false)}
                    >
                      Batal
                    </button>
                    <button
                      className='btn btn-primary'
                      onClick={() => {
                        handleProceedSubmission(SUBMISSION_STATUS_ENUM.REJECTED)
                      }}
                    >
                      Kirim
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </div>
      </Dialog>
    </DashboardProdiLayout>
  )
}

export default WorthinessRanking
