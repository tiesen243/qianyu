import { configureStore } from '@reduxjs/toolkit'

import counterSlice from '@/redux/slices/counter.slice'
import filmSlice from '@/redux/slices/film.slice'
import productManagerSlice from '@/redux/slices/product-manager.slice'
import productSlice from '@/redux/slices/product.slice'
import userSlice from '@/redux/slices/user.slice'

export const store = configureStore({
  reducer: {
    [counterSlice.reducerPath]: counterSlice.reducer,
    [productManagerSlice.reducerPath]: productManagerSlice.reducer,

    [filmSlice.reducerPath]: filmSlice.reducer,

    [userSlice.reducerPath]: userSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    // oxlint-disable-next-line unicorn/prefer-spread
    getDefaultMiddleware().concat(
      userSlice.middleware,
      productSlice.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
