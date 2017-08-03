import { createSelector } from 'reselect'

const selectSignUp = state => state.signUp

export default function makeSelect(attribute) {
  return createSelector(selectSignUp, signUpState => signUpState[attribute])
}
