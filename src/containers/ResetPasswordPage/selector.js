import { createSelector } from 'reselect'

const selectResetPassword = state => state.resetPassword

export default function makeSelect(attribute) {
  return createSelector(
    selectResetPassword,
    resetPasswordState => resetPasswordState[attribute]
  )
}
