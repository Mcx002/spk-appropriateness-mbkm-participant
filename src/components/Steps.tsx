import { StepConnector, stepConnectorClasses, StepIconProps, styled } from '@mui/material'
import { FC } from 'react'

import clsxm from '@/utils/clsxm'

export const StepIcon: FC<StepIconProps> = ({ active, completed, className, ...props }) => {
  return (
    <div
      className={clsxm(
        'flex h-[40px] w-[40px] items-center justify-center rounded-full font-montserrat font-bold ',
        active ? 'bg-primary text-white' : 'border-2 border-[#C5C5C5] bg-transparent text-[#C5C5C5]'
      )}
    >
      {props.icon}
    </div>
  )
}
export const StepIconSmall: FC<StepIconProps> = ({ active, completed, className, ...props }) => {
  return (
    <div
      className={clsxm(
        'flex h-[20px] w-[20px] items-center justify-center rounded-full font-montserrat text-xs font-bold ',
        active ? 'bg-primary text-white' : 'border-2 border-[#C5C5C5] bg-transparent text-[#C5C5C5]'
      )}
    >
      {props.icon}
    </div>
  )
}

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    width: '3px',
    border: 0,
    height: '52px',
    marginLeft: '5px',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}))
export const ColorlibConnectorSmall = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    height: '3px',
    border: 0,
    flex: 1,
    marginLeft: '5px',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}))
