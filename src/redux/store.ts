import { configureStore } from '@reduxjs/toolkit'

import authReducer from '@/redux/slices/auth.slice'
import counterReducer from '@/redux/slices/counter.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
