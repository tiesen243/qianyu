import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  isAuthenticated: boolean
  user: {
    id: string
    name: string
  } | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  } as AuthState,
  reducers: {
    login: (state, action: PayloadAction<NonNullable<AuthState['user']>>) => {
      state.isAuthenticated = true
      state.user = action.payload
    },

    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
