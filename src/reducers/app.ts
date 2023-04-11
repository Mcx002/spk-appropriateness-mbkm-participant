import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: { isLoading: boolean } = {
  isLoading: false,
}

export const authReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading
    },
    clearData: (state) => {
      state.isLoading = false
    },
  },
})

export const { setData: appSetData, clearData: appClearData } = authReducer.actions

export default authReducer.reducer
