import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
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

export type CounterActions =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
