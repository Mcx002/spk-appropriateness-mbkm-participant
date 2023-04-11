import React from 'react'

import { AuthAppContextValue } from './auth/types'

export const AuthAppContext = React.createContext<AuthAppContextValue | undefined>(undefined)
export const AuthUserContext = React.createContext<AuthAppContextValue | undefined>(undefined)
