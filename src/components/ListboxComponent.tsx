import { Listbox } from '@headlessui/react'
import { ExpandMore } from '@mui/icons-material'
import { FC, useState } from 'react'

import clsxm from '@/utils/clsxm'

type ListboxOption = {
  id: string
  name: string
}

export type ListboxChangeEvent = {
  id: string
  key: string
}

type ListboxComponentProps = {
  value?: string
  onChange?: (e: ListboxChangeEvent) => void
  listData: ListboxOption[]
  id?: string
  label?: string
  required?: boolean
  disabled?: boolean
}

export function convertToListboxOption<T>(listData: T[], id: keyof T, name: keyof T): ListboxOption[] {
  if (listData.length === 0) {
    return [{ id: '', name: '-' }]
  }
  return listData.map<ListboxOption>((val) => ({ id: String(val[id]), name: String(val[name]) }))
}

const ListboxComponent: FC<ListboxComponentProps> = ({ ...props }) => {
  const [selectedData, setSelectedData] = useState<ListboxOption>(props.listData[0])
  const handleChange = (e: string) => {
    const data = props.listData.find((val) => val.id === e)
    if (data) {
      setSelectedData(data)
    }
    if (props.onChange) {
      props.onChange({ id: props.id ?? '', key: e })
    }
  }
  return (
    <div className='block space-y-2'>
      <p className='text-xs font-bold text-input-label'>
        {props.label} {props.required && <span className='text-danger'>*</span>}
      </p>
      <Listbox
        disabled={props.disabled}
        value={selectedData.name}
        onChange={handleChange}
      >
        <div className='relative'>
          <Listbox.Button
            className={clsxm(
              'block w-full min-w-0 flex-1 rounded border border-gray-200 p-3 text-left text-xs focus:border-primary focus:ring-primary',
              props.disabled && 'bg-gray-200'
            )}
          >
            {selectedData.name}
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ExpandMore
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {props.listData.map((val) => (
              <Listbox.Option
                key={val.id}
                value={val.id}
                className='relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-amber-100 hover:text-amber-900'
              >
                {val.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )
}

export default ListboxComponent
