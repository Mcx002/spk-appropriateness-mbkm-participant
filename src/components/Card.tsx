import { ReactNodeLike } from 'prop-types'
import React, { FC } from 'react'

import clsxm from '@/utils/clsxm'

type CardProps = {
  children?: ReactNodeLike
  className?: string
}

type CardHeadProps = {
  children?: ReactNodeLike
  className?: string
}

type CardBodyProps = {
  children?: ReactNodeLike
  className?: string
}

export const CardHead: FC<CardHeadProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={clsxm('head border-b px-6 py-4 font-poppins text-base font-bold text-[#464646]', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardBody: FC<CardBodyProps> = ({ children, ...props }) => {
  return (
    <div
      className='body p-6'
      {...props}
    >
      {children}
    </div>
  )
}

const Card: FC<CardProps> = ({ className, children }) => {
  return <div className={clsxm(className, 'steps rounded-xl border')}>{children}</div>
}

export default Card
