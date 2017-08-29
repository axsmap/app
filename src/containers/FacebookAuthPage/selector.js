import { createSelector } from 'reselect'

const selectFacebookAuth = state => state.facebookAuth

export default function makeSelect(attribute) {
  return createSelector(
    selectFacebookAuth,
    facebookAuthState => facebookAuthState[attribute]
  )
}
