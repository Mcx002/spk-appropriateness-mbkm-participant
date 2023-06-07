import { Dialog } from '@headlessui/react'
import { Add, CalendarMonth } from '@mui/icons-material'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { CircularProgress, Tooltip } from '@mui/material'
import { DateTime } from 'luxon'
import Link from 'next/link'
import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'
import { Simulate } from 'react-dom/test-utils'
import { toast } from 'react-hot-toast'

import InputComponent from '@/components/InputComponent'
import MyPagination from '@/components/Pagination'
import { TableTh } from '@/components/Table'
import DashboardProdiLayout from '@/layouts/Dashboard-prodi-layout'
import { useLazyGetListPeriodQuery, useSavePeriodMutation, useUpdatePeriodMutation } from '@/services/period'
import { CommonError, ListMeta } from '@/types/common'
import { GetPeriodRequest, getPeriodStatusName, PERIOD_STATUS_ENUM, PeriodDto } from '@/types/period'
import clsxm from '@/utils/clsxm'

import Banner from '~/assets/icons/Banner.png'
import FileNotFoundIcon from '~/assets/icons/file-not-found-icon.svg'
import error = Simulate.error
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { DateRange, RangeKeyDict } from 'react-date-range'

type PeriodForm = {
  name: string
  start_date: string
  end_date: string
  id: string | null
}

type PeriodErrors = {
  name: string[]
  start_date: string[]
  end_date: string[]
}

const Dashboard: FC = () => {
  const [order, setOrder] = useState('created_at|desc')
  const [getListPeriod, { data: listPeriodData, error: listPeriodError }] = useLazyGetListPeriodQuery()
  const [periods, setPeriods] = useState<PeriodDto[]>([])
  const [isDialogueScheduleFormOpen, setDialogueScheduleFormOpen] = useState(false)
  const [scheduleForm, setScheduleForm] = useState<PeriodForm>({
    name: '',
    start_date: '',
    end_date: '',
    id: null,
  })
  const [isCreateScheduleForm, setCreateScheduleForm] = useState(true)
  const [previewRangeDateFilter, setPreviewRangeDateFilter] = useState<{ start_date: string; end_date: string } | null>(
    null
  )
  const [appliedRangeDateFilter, setAppliedRangeDateFilter] = useState<{ start_date: string; end_date: string } | null>(
    null
  )
  const [isDateRangeFilterOpen, setDateRangeFilterOpen] = useState(false)
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const dateRangeRef = useRef<HTMLDivElement>(null)

  const [savePeriod, { isSuccess: savePeriodSuccess, error: savePeriodError, isLoading: savePeriodLoading }] =
    useSavePeriodMutation()
  const [updatePeriod, { isSuccess: updatePeriodSuccess, error: updatePeriodError, isLoading: updatePeriodLoading }] =
    useUpdatePeriodMutation()
  const [periodErrors, setPeriodErrors] = useState<PeriodErrors>({
    name: [],
    start_date: [],
    end_date: [],
  })

  const [listPeriodMeta, setListPeriodMeta] = useState<ListMeta>({
    limit: 10,
    offset: 0,
    total: 0,
    page: 1,
    pages: 1,
  })

  const triggerGetListPeriod = () => {
    const req: GetPeriodRequest = {
      params: {
        limit: listPeriodMeta.limit,
        offset: listPeriodMeta.offset,
        order,
      },
    }

    if (appliedRangeDateFilter) {
      req.params.start_date = appliedRangeDateFilter.start_date
      req.params.end_date = appliedRangeDateFilter.end_date
    }
    console.log(req, appliedRangeDateFilter)
    getListPeriod(req)
  }

  useEffect(() => {
    triggerGetListPeriod()
    function handleClickOutsideDateRange(e: MouseEvent) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (dateRangeRef.current && !dateRangeRef.current.contains(e.target)) {
        setDateRangeFilterOpen(false)
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutsideDateRange)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutsideDateRange)
    }
  }, [])

  useEffect(() => {
    if (listPeriodData) {
      setPeriods(listPeriodData.result)
      setListPeriodMeta({ ...listPeriodMeta, ...(listPeriodData.meta as ListMeta) })
    }
  }, [listPeriodData])

  useEffect(() => {
    if (savePeriodSuccess || updatePeriodSuccess) {
      setDialogueScheduleFormOpen(false)
      resetScheduleForm()
      triggerGetListPeriod()
    }
    if (savePeriodSuccess) {
      toast.success('Jadwal telah ditambahkan')
    }
    if (updatePeriodSuccess) {
      toast.success('Jadwal telah diubah')
    }
    if (savePeriodError) {
      const error = (savePeriodError as CommonError).data
      toast.error(error.message)
      setPeriodErrors({ ...periodErrors, ...(error.result as PeriodErrors) })
    }
    if (updatePeriodError) {
      const error = (updatePeriodError as CommonError).data
      toast.error(error.message)
      setPeriodErrors({ ...periodErrors, ...(error.result as PeriodErrors) })
    }
  }, [savePeriodSuccess, savePeriodError, updatePeriodSuccess, updatePeriodError])

  useEffect(() => {
    if (dateRange) {
      const start_date = DateTime.fromJSDate(dateRange.startDate).toFormat('yyyy-MM-dd')
      const end_date = DateTime.fromJSDate(dateRange.endDate).toFormat('yyyy-MM-dd')
      setPreviewRangeDateFilter({ start_date, end_date })
    }
  }, [dateRange])

  useEffect(() => {
    if (listPeriodMeta) {
      triggerGetListPeriod()
    }
  }, [listPeriodMeta])

  useEffect(() => {
    triggerGetListPeriod()
  }, [appliedRangeDateFilter])

  const handlePageClick = (e: { offset: number }) => {
    setListPeriodMeta({ ...listPeriodMeta, offset: e.offset })
  }

  const handleChangeScheduleForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setScheduleForm({ ...scheduleForm, [e.target.id]: e.target.value })
  }

  const handleCloseScheduleFormDialog = () => {
    setDialogueScheduleFormOpen(false)
    resetScheduleForm()
  }

  const handleSubmitSaveSchedule = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', scheduleForm.name)
    formData.append('start_date', scheduleForm.start_date)
    formData.append('end_date', scheduleForm.end_date)

    if (scheduleForm.id) {
      formData.append('status', PERIOD_STATUS_ENUM.OPEN)
      formData.append('id', scheduleForm.id)
      updatePeriod(formData)

      return
    }

    savePeriod(formData)
  }

  const resetScheduleForm = () => {
    setScheduleForm({
      name: '',
      start_date: '',
      end_date: '',
      id: null,
    })
    setPeriodErrors({
      name: [],
      start_date: [],
      end_date: [],
    })
  }

  const handleUpdateButtonSchedule = (val: PeriodDto) => {
    setCreateScheduleForm(false)
    setScheduleForm({
      name: val.name,
      start_date: val.start_date,
      end_date: val.end_date,
      id: val.id.toString(),
    })
    setDialogueScheduleFormOpen(true)
  }

  const hanldeDateRangeChange = (ranges: RangeKeyDict) => {
    setDateRange({ ...dateRange, ...ranges.selection })
  }
  return (
    <DashboardProdiLayout title='Dashboard'>
      <div className='mb-[50px] grid w-full grid-cols-1 gap-8 px-4 pt-8 md:px-32'>
        <img
          src={Banner.src}
          alt='dashboard banner'
          className='h-full w-full object-contain'
        />
        <div className='grid grid-cols-1 gap-4'>
          <div className='title'>
            <h1 className='text-2xl font-bold'>Jadwal Pengajuan</h1>
            <div className='actions mt-2 flex flex-col flex-wrap justify-between gap-2 sm:flex-row'>
              <div className='left'>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const start_date = DateTime.fromJSDate(dateRange.startDate).toFormat('yyyy-MM-dd')
                    const end_date = DateTime.fromJSDate(dateRange.endDate).toFormat('yyyy-MM-dd')
                    setAppliedRangeDateFilter({ start_date, end_date })
                  }}
                  className='flex flex-row flex-wrap'
                >
                  <div className='relative h-fit w-fit'>
                    <button
                      type='button'
                      placeholder='Filter Tanggal'
                      className='flex w-full cursor-pointer items-center rounded border border-gray-200 px-3 py-[4px] text-left text-xs active:bg-gray-200 lg:w-[420px]'
                      onClick={(e) => {
                        e.preventDefault()
                        setDateRangeFilterOpen(true)
                      }}
                    >
                      <span className='flex-1'>
                        {previewRangeDateFilter ? (
                          <>
                            {previewRangeDateFilter.start_date} <span className='text-gray-400'>-</span>{' '}
                            {previewRangeDateFilter.end_date}
                          </>
                        ) : (
                          'Filter Tanggal'
                        )}
                      </span>
                      <CalendarMonth className='text-gray-400' />
                    </button>
                    <div
                      className={clsxm('absolute', isDateRangeFilterOpen ? ' block' : ' hidden')}
                      ref={dateRangeRef}
                    >
                      <DateRange
                        ranges={[dateRange]}
                        onChange={hanldeDateRangeChange}
                        className='shadow'
                      />
                    </div>
                  </div>
                  <button className='btn-primary float-right ml-2 px-5 py-2 font-montserrat text-xs font-bold'>
                    Filter
                  </button>
                  <button
                    className='float-right ml-2 rounded-md bg-danger px-5 py-2 font-montserrat text-xs font-bold text-white hover:bg-red-600 active:bg-red-700'
                    onClick={(e) => {
                      e.preventDefault()
                      setAppliedRangeDateFilter(null)
                      console.log(appliedRangeDateFilter)
                    }}
                  >
                    Reset
                  </button>
                </form>
              </div>
              <div className='right flex flex-row items-center gap-5'>
                <button
                  className='btn-primary float-right px-5 py-2 font-montserrat text-xs font-bold'
                  onClick={() => {
                    setCreateScheduleForm(true)
                    setDialogueScheduleFormOpen(true)
                  }}
                >
                  <Add className='mat-icon-normal' /> Tambah Jadwal
                </button>
              </div>
            </div>
          </div>
          <div className='w-full overflow-hidden rounded text-sm'>
            {periods.length > 0 ? (
              <div className='flex flex-col gap-8'>
                <div className='overflow-x-scroll'>
                  <table className='table-custom w-full min-w-[583px]'>
                    <thead className='bg-gray-500 text-left'>
                      <tr className='bg-gray-500'>
                        <TableTh>No.</TableTh>
                        <TableTh
                          onClick={(e, order) => {
                            setOrder(`name|${order}`)
                          }}
                        >
                          Periode
                        </TableTh>
                        <TableTh>Tanggal Pengajuan</TableTh>
                        <TableTh
                          onClick={(e, order) => {
                            setOrder(`status|${order}`)
                          }}
                        >
                          Status
                        </TableTh>
                        <TableTh>
                          <div className='w-[100%] text-center'>Aksi</div>
                        </TableTh>
                      </tr>
                    </thead>
                    <tbody>
                      {periods.map((val, i) => (
                        <tr
                          key={i}
                          className='hover:bg-gray-100'
                        >
                          <td>{i + 1}</td>
                          <td>{val.name}</td>
                          <td>
                            {val.start_date}/{val.end_date}
                          </td>
                          <td>
                            <div className='flex justify-center md:justify-start'>
                              <div
                                className={clsxm(
                                  'w-fit rounded-2xl p-2 text-center',
                                  val.status === PERIOD_STATUS_ENUM.OPEN && 'bg-[#C9FFD5] text-[#329C70]',
                                  val.status === PERIOD_STATUS_ENUM.CLOSED && 'bg-[#FFD6D6] text-[#EF5656]'
                                )}
                              >
                                {getPeriodStatusName(val.status)}
                              </div>
                            </div>
                          </td>
                          <td className='flex items-center justify-center gap-3'>
                            {val.status === PERIOD_STATUS_ENUM.CLOSED && (
                              <Tooltip title='Hasil SPK'>
                                <Link
                                  href={`/prodi/period/${val.id}/worthiness-ranking`}
                                  className='text-[#006BCD]'
                                >
                                  <VisibilityOutlinedIcon />
                                </Link>
                              </Tooltip>
                            )}
                            {val.status === PERIOD_STATUS_ENUM.OPEN && (
                              <Tooltip title='Daftar pengajuan'>
                                <Link
                                  href={`/prodi/period/${val.id}`}
                                  className='text-[#006BCD]'
                                >
                                  <AssignmentOutlinedIcon className='text-[#424242]' />
                                </Link>
                              </Tooltip>
                            )}
                            {val.status === PERIOD_STATUS_ENUM.OPEN && (
                              <Tooltip title='Edit Jadwal'>
                                <button
                                  className='text-blue-500'
                                  onClick={() => handleUpdateButtonSchedule(val)}
                                >
                                  <CreateOutlinedIcon />
                                </button>
                              </Tooltip>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className='flex justify-end'>
                  {listPeriodMeta.pages > 1 && (
                    <MyPagination
                      onPageClick={handlePageClick}
                      limit={listPeriodMeta.limit}
                      pages={listPeriodMeta.pages}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className='mt-8 flex w-full justify-center'>
                <div className='flex w-[277px] flex-col items-center'>
                  <FileNotFoundIcon className='h-[133px] w-[175px]' />
                  <div className='flex flex-col items-center text-center'>
                    <h1 className='font-montserrat font-bold'>Belum ada Jadwal yang didaftarkan</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={isDialogueScheduleFormOpen}
        onClose={handleCloseScheduleFormDialog}
      >
        <div className='fixed inset-0 z-[50] flex items-center justify-center p-4'>
          <div
            className='fixed inset-0 bg-black/30'
            aria-hidden='true'
          />
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <Dialog.Panel className='mx-auto flex w-[530px] flex-col items-center gap-[26px] rounded bg-white p-7 px-[54px]'>
                <Dialog.Title className='text-center text-2xl font-semibold'>
                  {isCreateScheduleForm ? 'Tambah' : 'Ubah'} Jadwal Pengajuan
                </Dialog.Title>
                <form
                  onSubmit={handleSubmitSaveSchedule}
                  className='grid w-[100%] grid-cols-1 gap-3'
                >
                  <div className='grid w-[100%] grid-cols-1 gap-3'>
                    <InputComponent
                      label='Nama Periode'
                      id='name'
                      value={scheduleForm.name}
                      onChange={handleChangeScheduleForm}
                      error={!!periodErrors.name}
                      helper={periodErrors.name[0]}
                    />
                    <div className='grid grid-cols-2 gap-3'>
                      <InputComponent
                        type='date'
                        label='Tanggal Mulai'
                        id='start_date'
                        value={scheduleForm.start_date}
                        onChange={handleChangeScheduleForm}
                        error={!!periodErrors.start_date}
                        helper={periodErrors.start_date[0]}
                      />
                      <InputComponent
                        type='date'
                        label='Tanggal Selesai'
                        id='end_date'
                        value={scheduleForm.end_date}
                        onChange={handleChangeScheduleForm}
                        error={!!periodErrors.end_date}
                        helper={periodErrors.end_date[0]}
                      />
                    </div>
                  </div>
                  <div className='flex w-[100%] flex-row justify-end gap-2'>
                    <button
                      className='btn btn-primary-light border'
                      onClick={handleCloseScheduleFormDialog}
                    >
                      Batal
                    </button>
                    <div className='h-fit w-fit'>
                      {savePeriodLoading || updatePeriodLoading ? (
                        <div className='flex w-[75px] justify-center'>
                          <CircularProgress />
                        </div>
                      ) : (
                        <button
                          type='submit'
                          className='btn btn-primary'
                        >
                          {isCreateScheduleForm ? 'Tambah' : 'Simpan'}
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </div>
      </Dialog>
    </DashboardProdiLayout>
  )
}

export default Dashboard
