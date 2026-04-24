import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id: number
  name: string
  username: string
  email: string
}

const userSlice = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/users',
  }),
  endpoints: (builder) => ({
    // oxlint-disable-next-line typescript/no-invalid-void-type
    getUsers: builder.query<User[], void>({
      query: () => '',
    }),
  }),
})

export const { useGetUsersQuery } = userSlice
export default userSlice
