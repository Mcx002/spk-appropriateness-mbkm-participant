import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { ReactNodeLike } from 'prop-types'
import { FC, MouseEvent, useState } from 'react'

import clsxm from '@/utils/clsxm'

type TableThProps = {
  order?: boolean
  children?: ReactNodeLike
  onClick?: (e: MouseEvent<HTMLTableCellElement>, order: string) => void
}

export const TableTh: FC<TableThProps> = ({ children, order = true, onClick }) => {
  const [orderOpt, setOrderOpt] = useState({
    up: false,
    down: false,
  })
  const handleClick = (e: MouseEvent<HTMLTableCellElement>) => {
    if (order && onClick) {
      let orderQuery = ''
      if (orderOpt.up) {
        setOrderOpt({
          up: false,
          down: true,
        })
        orderQuery = 'desc'
      }
      if (!orderOpt.up && !orderOpt.down) {
        setOrderOpt({
          up: true,
          down: false,
        })
        orderQuery = 'asc'
      }
      if (orderOpt.down) {
        setOrderOpt({
          up: false,
          down: false,
        })
      }
      onClick(e, orderQuery)
      return
    }
    return
  }
  return (
    <th
      onClick={handleClick}
      className={clsxm(order && onClick && 'cursor-pointer')}
    >
      <div className='flex flex-row items-center justify-between'>
        <span>{children}</span>
        {order && onClick && (
          <div className='relative flex h-6 w-6 flex-col'>
            <ArrowDropUp
              className={clsxm(
                'absolute bottom-0 mb-1 bg-transparent',
                orderOpt.up ? 'text-gray-600' : 'text-gray-400'
              )}
            />
            <ArrowDropDown
              className={clsxm('absolute top-0 mt-1 bg-transparent', orderOpt.down ? 'text-gray-600' : 'text-gray-400')}
            />
          </div>
        )}
      </div>
    </th>
  )
}
