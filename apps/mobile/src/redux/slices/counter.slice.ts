import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrease: (state) => {
      state.value -= 1
    },
  },
})

export const { increment, decrease } = counterSlice.actions
export default counterSlice
