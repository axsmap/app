import { createSelector } from 'reselect'

const selectSignIn = state => state.signIn

export default function makeSelectSignIn(attribute) {
  return createSelector(selectSignIn, signInState => signInState[attribute])
}
