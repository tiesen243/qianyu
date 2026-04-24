import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

import type { Product } from '@/redux/slices/product.slice'

const productManagerSlice = createSlice({
  name: 'productManager',
  initialState: {
    products: [] as Product[],
  },
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },

    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      state.products.push({
        id: state.products.length + 1,
        ...action.payload,
      })
    },

    editProduct: (
      state,
      action: PayloadAction<{ id: number; data: Partial<Omit<Product, 'id'>> }>
    ) => {
      const { id, data } = action.payload
      const index = state.products.findIndex((p) => p.id === id)
      if (index !== -1 && state.products[index])
        state.products[index] = {
          ...state.products[index],
          ...data,
        }
    },

    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((p) => p.id !== action.payload)
    },
  },
})

export const { setProducts, addProduct, editProduct, deleteProduct } =
  productManagerSlice.actions
export default productManagerSlice
