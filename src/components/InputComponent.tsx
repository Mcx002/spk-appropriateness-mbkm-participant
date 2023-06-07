import UploadFileIcon from '@mui/icons-material/UploadFile'
import React, { ChangeEvent, FC, ReactNode } from 'react'

import clsxm from '@/utils/clsxm'

export interface InputProps {
  id?: string
  className?: string
  classNameDiv?: string
  labelClassName?: string
  prepend?: ReactNode | string | number | undefined
  append?: ReactNode | string | number | undefined
  helper?: string | ReactNode
  label?: string
  type?: string
  value?: string | number | undefined
  disabled?: boolean
  defaultValue?: string | number
  placeholder?: string
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  rows?: number
  required?: boolean
  icon?: ReactNode
  showRequiredSymbol?: boolean
  error?: boolean
  min?: string | number
  max?: string | number
  step?: string
}

const InputTypeComponent: FC<InputProps> = ({ onChange, error, ...rest }) => {
  const conditionalInputClass = [
    rest.prepend && ' rounded-none rounded-r-xl',
    rest.append && ' rounded-none rounded-l',
    !rest.prepend && !rest.append && 'rounded',
    rest.icon && 'pr-14',
    error && 'border-danger',
    rest.disabled && 'bg-gray-100',
  ]
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      return onChange(e)
    }
    return
  }
  switch (rest.type) {
    case 'textarea':
      return (
        <textarea
          className={clsxm(
            'bg-green-box-greyscale-50 focus:border-green-box-primary-base block w-full min-w-0 flex-1 border border-gray-700 p-2 px-10' +
              ' focus:ring-green-box-primary-base',
            ...conditionalInputClass
          )}
          placeholder={rest.placeholder}
          value={rest.value}
          defaultValue={rest.defaultValue}
          onChange={handleChange}
          {...rest}
        />
      )
    case 'password':
      return (
        <input
          type={rest.type || 'text'}
          className={clsxm(
            'border-1 block w-full min-w-0 flex-1 border-gray-200 p-3 text-xs focus:border-primary' +
              ' focus:ring-primary',
            ...conditionalInputClass
          )}
          placeholder={rest.placeholder}
          value={rest.value}
          defaultValue={rest.defaultValue}
          onChange={handleChange}
          {...rest}
        />
      )
    case 'file':
      return (
        <div className='relative w-full'>
          <input
            type={rest.type}
            className='hidden'
            onChange={handleChange}
            id={rest.id}
          />
          <label
            htmlFor={rest.id}
            className='btn absolute right-0 top-0 h-full bg-[#999999] px-2 text-white hover:bg-[#888] active:bg-[#777] md:px-8'
          >
            <div className='hidden md:block'>Pilih File</div>
            <div className='block md:hidden'>
              <UploadFileIcon />
            </div>
          </label>
          <input
            type='text'
            readOnly
            className={clsxm(
              'border-1 focus:border-1 block w-full min-w-0 flex-1 cursor-default border-gray-200 p-3 text-xs focus:border-gray-200 focus:ring-0',
              ...conditionalInputClass
            )}
            placeholder={rest.placeholder}
            value={rest.value}
            defaultValue={rest.defaultValue}
          />
        </div>
      )
    default:
      return (
        <input
          type={rest.type || 'text'}
          className={clsxm(
            'border-1 block w-full min-w-0 flex-1 border-gray-200 p-3 text-xs focus:border-primary' +
              ' focus:ring-primary',
            ...conditionalInputClass
          )}
          placeholder={rest.placeholder}
          value={rest.value}
          defaultValue={rest.defaultValue}
          onChange={handleChange}
          {...rest}
        />
      )
  }
}
const InputComponent: FC<InputProps> = ({
  classNameDiv,
  error,
  labelClassName,
  showRequiredSymbol = true,
  ...rest
}) => {
  return (
    <div className={clsxm('block space-y-2', classNameDiv)}>
      {rest.label && (
        <p
          className={
            labelClassName ? labelClassName : 'text-green-box-greyscale-600 text-xs font-bold text-input-label'
          }
        >
          {rest.label}
          {showRequiredSymbol && <span className='text-danger'> *</span>}
        </p>
      )}
      <div className='flex'>
        {rest.prepend && (
          <span className='bg-green-box-greyscale-50 text-green-box-greyscale-900 inline-flex items-center rounded-l-xl px-3 text-sm'>
            {rest.prepend}
          </span>
        )}
        <div className='relative flex w-full flex-row items-center'>
          <InputTypeComponent {...rest} />
          <div className='absolute right-4'>{rest.icon}</div>
        </div>
        {rest.append && (
          <span className='bg-green-box-greyscale-50 text-green-box-greyscale-900 inline-flex items-center rounded-r-xl px-3 text-sm'>
            {rest.append}
          </span>
        )}
      </div>
      {rest.helper && <p className={clsxm('text-xs text-gray-400', error && 'text-danger')}>{rest.helper}</p>}
    </div>
  )
}

export default InputComponent
