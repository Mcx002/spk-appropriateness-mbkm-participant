import { useState } from 'react'
import ReactPaginate from 'react-paginate'

import clsxm from '@/utils/clsxm'

// type PaginatedItemsProps = {
//     itemsPerPage: number
// }
//
// const PaginatedItems: FC<PaginatedItemsProps> = ({itemsPerPage}) => {
//     return (
//         <>
//             <Items currentItems={currentItems} />
//             <ReactPaginate
//                 breakLabel="..."
//                 nextLabel="next >"
//                 onPageChange={handlePageClick}
//                 pageRangeDisplayed={5}
//                 pageCount={pageCount}
//                 previousLabel="< previous"
//                 renderOnZeroPageCount={null}
//             />
//         </>
//     )
// }

const Page = () => {
  const items = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 6, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 1, 2, 3,
    4, 5, 6, 1, 2, 3, 4, 1, 23, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5,
    1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 1, 23, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2,
    3, 4, 5, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 1, 23, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4,
    5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 1, 23, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1,
    2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4,
  ]
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 5

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage
  console.log(`Loading items from ${itemOffset} to ${endOffset}`)
  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(items.length / itemsPerPage)

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
    setItemOffset(newOffset)
  }
  return (
    <div
      className={clsxm(
        'pointer-events-auto m-10 flex flex w-full flex-row rounded-lg bg-white p-4 shadow-md ring-1 ring-black ring-opacity-5'
      )}
    >
      <ReactPaginate
        breakLabel={<div className='btn-pagination !rounded-none'>...</div>}
        nextLabel={<div className='btn-pagination rounded-r-xl'>{'>'}</div>}
        className='flex flex-row items-center '
        activeLinkClassName='btn-active'
        pageLabelBuilder={(s) => <div className='btn-pagination min-w-[40px]'>{s}</div>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel={<div className='btn-pagination rounded-l-xl'>{'<'}</div>}
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Page
