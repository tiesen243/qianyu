import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  brand: string
  image: string | undefined
}

const productSlice = createApi({
  reducerPath: 'product',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/products',
  }),
  endpoints: (builder) => ({
    // oxlint-disable-next-line typescript/no-invalid-void-type
    products: builder.query<{ products: Product[] }, void>({
      query: () => '?limit=30',
      transformResponse: (response: {
        products: (Product & { images: string[] })[]
      }) => ({
        products: response.products.map((p) => ({
          ...p,
          image: Array.isArray(p.images) ? p.images[0] : p.image,
        })),
      }),
    }),
    searchProducts: builder.query<
      { products: Product[]; total: number; skip: number },
      string
    >({
      query: (q: string) => `/search?q=${q}&limit=10`,
    }),
  }),
})

export const { useProductsQuery, useSearchProductsQuery } = productSlice
export default productSlice
