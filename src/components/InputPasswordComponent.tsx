import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FC, useState } from 'react'

import InputComponent, { InputProps } from '@/components/InputComponent'

type toggleVisibility = {
  type: 'password' | 'text'
  icon: JSX.Element
}

const InputPasswordComponent: FC<InputProps> = (props) => {
  const [state, setState] = useState<toggleVisibility>({
    type: 'password',
    icon: <VisibilityOff className='cursor-pointer text-gray-300' />,
  })

  const holdingStart = () => {
    setState({
      type: 'text',
      icon: <Visibility className='cursor-pointer text-gray-300' />,
    })
  }

  const holdingStop = () => {
    setState({
      type: 'password',
      icon: <VisibilityOff className='cursor-pointer text-gray-300' />,
    })
  }

  const icon = (
    <div
      onMouseDown={holdingStart}
      onMouseUp={holdingStop}
      onMouseLeave={holdingStop}
      onTouchStart={holdingStart}
      onTouchEnd={holdingStop}
    >
      {state.icon}
    </div>
  )
  return (
    <InputComponent
      type={state.type}
      icon={icon}
      {...props}
    />
  )
}

export default InputPasswordComponent
