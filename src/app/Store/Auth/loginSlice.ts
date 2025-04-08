import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  error: '',
}

const loginSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    loginPending: state => {
      state.isLoading = true
      state.error = ''
    },
    loginSuccess: state => {
      state.isLoading = false
      state.error = ''
    },
    loginFailed: (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    },
  },
})
const { actions, reducer } = loginSlice

export const { loginPending, loginSuccess, loginFailed } = actions

export default reducer
