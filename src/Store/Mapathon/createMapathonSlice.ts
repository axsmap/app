import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  error: '',
}

const createMapathonSlice = createSlice({
  name: 'mapathon',
  initialState,
  reducers: {
    createPending: state => {
      state.isLoading = true
      state.error = ''
    },
    createSuccess: state => {
      state.isLoading = false
      state.error = ''
    },
    createFailed: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
  },
})

const { actions, reducer } = createMapathonSlice

export const { createPending, createSuccess, createFailed } = actions

export default reducer
