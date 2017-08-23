import { createSelector } from 'reselect'

const selectForgottenPassword = state => state.forgottenPassword

export default function makeSelect(attribute) {
  return createSelector(
    selectForgottenPassword,
    forgottenPasswordState => forgottenPasswordState[attribute]
  )
}
