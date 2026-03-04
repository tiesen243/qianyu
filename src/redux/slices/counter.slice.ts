import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  } as CounterState,
  reducers: {
    increment: (state, payload: PayloadAction<number | undefined>) => {
      state.value += payload.payload ?? 1
    },
    decrement: (state, payload: PayloadAction<number | undefined>) => {
      state.value -= payload.payload ?? 1
    },
  },
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
