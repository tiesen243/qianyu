import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

export interface Movie {
  id: number
  title: string
  year: string
  runtime: string
  genres: string[]
  director: string
  actors: string
  plot: string
  posterUrl: string | undefined
}

const filmSlice = createSlice({
  name: 'film',
  initialState: {
    movies: [] as Movie[],
  },
  reducers: {
    addFilm: (state, action: PayloadAction<Omit<Movie, 'id'>>) => {
      state.movies.push({
        ...action.payload,
        id: state.movies.length > 0 ? (state.movies.at(-1)?.id ?? 0) + 1 : 1,
      })
    },
    editFilm: (
      state,
      action: PayloadAction<{
        id: Movie['id']
        data: Partial<Omit<Movie, 'id'>>
      }>
    ) => {
      const { id, data } = action.payload

      const index = state.movies.findIndex((movie) => movie.id === id)
      if (index === -1) throw new Error(`Movie with id ${id} not found`)

      state.movies[index] = {
        ...state.movies[index],
        ...data,
        id,
      } as Movie
    },

    deleteFilm: (state, action: PayloadAction<Movie['id']>) => {
      const id = action.payload

      const index = state.movies.findIndex((movie) => movie.id === id)
      if (index === -1) throw new Error(`Movie with id ${id} not found`)

      state.movies.splice(index, 1)
    },
  },
})

export const { addFilm, editFilm, deleteFilm } = filmSlice.actions
export default filmSlice
