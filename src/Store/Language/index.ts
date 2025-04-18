import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'language',
  initialState: { language: 'en' },
  reducers: {
    changeLanguage: (state, { payload }) => {
      state.language = payload
    },
    getLanguage: state => {
      return state.language ?? 'en'
    },
  },
})

const { actions, reducer } = slice

export const { changeLanguage, getLanguage } = actions

export default reducer
