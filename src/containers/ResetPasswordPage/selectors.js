import { createSelector } from 'reselect'

const selectResetPassword = state => state.resetPassword

// TODO: Create just one function to return variables from state
export const makeSelectSuccessMessage = () =>
  createSelector(
    selectResetPassword,
    resetPasswordState => resetPasswordState.successMessage
  )

export const makeSelectErrorMessage = () =>
  createSelector(
    selectResetPassword,
    resetPasswordState => resetPasswordState.errorMessage
  )

export const makeSelectData = () =>
  createSelector(
    selectResetPassword,
    resetPasswordState => resetPasswordState.data
  )

export const makeSelectErrors = () =>
  createSelector(
    selectResetPassword,
    resetPasswordState => resetPasswordState.errors
  )

export const makeSelectShowPassword = () =>
  createSelector(
    selectResetPassword,
    resetPasswordState => resetPasswordState.showPassword
  )
