import { DateRange, RangeKeyDict } from 'react-date-range'

import clsxm from '@/utils/clsxm'

const Page = () => {
  const _selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }
  const _handleSelect = (ranges: RangeKeyDict) => {
    console.log(ranges)
  }
  return (
    <div
      className={clsxm(
        'pointer-events-auto m-10 flex w-full flex-row rounded-lg bg-white p-4 shadow-md ring-1 ring-black ring-opacity-5'
      )}
    >
      <DateRange />
    </div>
  )
}

export default Page
