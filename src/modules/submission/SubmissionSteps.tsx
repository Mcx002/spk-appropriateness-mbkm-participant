import { Step, StepLabel, Stepper } from '@mui/material'
import { FC } from 'react'

import { ColorlibConnector, ColorlibConnectorSmall, StepIcon, StepIconSmall } from '@/components/Steps'
import clsxm from '@/utils/clsxm'

type SubmissionStepsProps = {
  active: number
}

export const SubmissionSteps: FC<SubmissionStepsProps> = ({ active }) => {
  return (
    <>
      <div className='hidden lg:block'>
        <Stepper
          activeStep={active}
          orientation='vertical'
          className='mt-7'
          connector={<ColorlibConnector />}
        >
          <Step>
            <StepLabel StepIconComponent={StepIcon}>
              <span
                className={clsxm(
                  'font-montserrat text-sm font-bold ',
                  active === 0 ? 'text-primary' : 'text-[#C5C5C5]'
                )}
              >
                Detail Mahasiswa
              </span>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={StepIcon}>
              <span
                className={clsxm(
                  'font-montserrat text-sm font-bold ',
                  active === 1 ? 'text-primary' : 'text-[#C5C5C5]'
                )}
              >
                Persyaratan
              </span>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={StepIcon}>
              <span
                className={clsxm(
                  'font-montserrat text-sm font-bold ',
                  active === 2 ? 'text-primary' : 'text-[#C5C5C5]'
                )}
              >
                Mengirim Persyaratan Pengajuan
              </span>
            </StepLabel>
          </Step>
        </Stepper>
      </div>

      <div className='block lg:hidden'>
        <Stepper
          activeStep={active}
          orientation='horizontal'
          className='mt-7'
          connector={<ColorlibConnectorSmall />}
        >
          <Step>
            <StepLabel StepIconComponent={StepIconSmall}>
              <span
                className={clsxm(
                  'font-montserrat text-[0.6rem] font-bold ',
                  active === 0 ? 'text-primary' : 'text-[#C5C5C5]'
                )}
              >
                Detail Mahasiswa
              </span>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={StepIconSmall}>
              <span
                className={clsxm(
                  'font-montserrat text-[0.6rem] font-bold ',
                  active === 1 ? 'text-primary' : 'text-[#C5C5C5]'
                )}
              >
                Persyaratan
              </span>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={StepIconSmall}>
              <span
                className={clsxm(
                  'font-montserrat text-[0.6rem] font-bold ',
                  active === 2 ? 'text-primary' : 'text-[#C5C5C5]'
                )}
              >
                Mengirim Persyaratan Pengajuan
              </span>
            </StepLabel>
          </Step>
        </Stepper>
      </div>
    </>
  )
}
