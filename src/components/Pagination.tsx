import { FC } from 'react'
import ReactPaginate from 'react-paginate'

type PaginationProps = {
  total: number
  limit: number
  initialOffset: number
  onPageClick: (e: { offset: number }) => void
}

const Pagination: FC<PaginationProps> = ({ total, limit, initialOffset, onPageClick }) => {
  const pageCount = Math.ceil(total / limit)
  const initialPage = Math.ceil(initialOffset / limit)

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * limit) % total

    if (onPageClick) {
      onPageClick({ offset: newOffset })
    }
  }
  return (
    <div className='flex w-full justify-end'>
      <ReactPaginate
        breakLabel={<div className='btn-pagination !rounded-none'>...</div>}
        nextLabel={<div className='btn-pagination rounded-r-xl'>{'>'}</div>}
        className='flex flex-row items-center '
        activeLinkClassName='btn-active'
        pageLabelBuilder={(s) => <div className='btn-pagination min-w-[40px]'>{s}</div>}
        onPageChange={handlePageClick}
        initialPage={initialPage}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel={<div className='btn-pagination rounded-l-xl'>{'<'}</div>}
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pagination
