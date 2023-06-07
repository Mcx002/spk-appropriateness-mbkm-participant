import usePagination from '@mui/material/usePagination'
import React, { FC } from 'react'

import clsxm from '@/utils/clsxm'

type PaginationProps = {
  limit: number
  onPageClick: (e: { offset: number }) => void
  pages: number
}
export const MyPagination: FC<PaginationProps> = ({ onPageClick, limit, pages }) => {
  const { items } = usePagination({
    count: pages,
    showFirstButton: true,
    showLastButton: true,
  })

  return (
    <nav>
      <div className='m-0 flex list-none flex-wrap p-0 md:flex-row'>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = <div className='btn-pagination select-none !rounded-none'>...</div>
          } else if (type === 'page') {
            children = (
              <button
                type='button'
                className={clsxm('btn-pagination min-w-[40px]', selected && 'border-[#5852F2]')}
                {...item}
              >
                {page}
              </button>
            )
          } else {
            switch (type) {
              case 'first':
                children = (
                  <button
                    type='button'
                    className='btn-pagination rounded-l-xl'
                    {...item}
                  >
                    {'<<'}
                  </button>
                )
                break
              case 'last':
                children = (
                  <button
                    type='button'
                    className='btn-pagination rounded-r-xl'
                    {...item}
                  >
                    {'>>'}
                  </button>
                )
                break
              case 'previous':
                children = (
                  <button
                    type='button'
                    className='btn-pagination rounded-none'
                    {...item}
                  >
                    {'<'}
                  </button>
                )
                break
              case 'next':
                children = (
                  <button
                    type='button'
                    className='btn-pagination rounded-none'
                    {...item}
                  >
                    {'>'}
                  </button>
                )
                break
            }
          }

          return (
            <li
              key={index}
              onClick={() => {
                if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                  return
                }
                onPageClick({ offset: ((page ?? 1) - 1) * limit })
              }}
            >
              {children}
            </li>
          )
        })}
      </div>
    </nav>
  )
}

export default MyPagination
