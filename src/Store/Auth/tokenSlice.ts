import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  email: '',
  password: '',
  rememberMe: false,
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    getTokenSuccess: (state, { payload }) => {
      state.token = payload
    },
    clearToken: state => {
      state.token = ''
    },
    rememberMe: (state, { payload }) => {
      state.email = payload?.email
      state.password = payload?.password
      state.rememberMe = payload?.rememberMe
    },
    clearRememberMe: state => {
      state.email = ''
      state.password = ''
      state.rememberMe = false
    },
  },
})
const { actions, reducer } = tokenSlice

export const { getTokenSuccess, rememberMe, clearRememberMe, clearToken } =
  actions

export default reducer
