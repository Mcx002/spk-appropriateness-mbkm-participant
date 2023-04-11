export enum AuthStatus {
  Loading = 'loading',
  Authenticated = 'authenticated',
  Unauthenticated = 'unauthenticated',
}

export interface AuthAppContextValue {
  status: AuthStatus
}

export interface AuthUserContextValue<D = undefined> {
  data: D
  status: AuthStatus
}
