import { createSelector } from 'reselect'

const selectSocialAuth = state => state.socialAuth

export default function makeSelect(attribute) {
  return createSelector(
    selectSocialAuth,
    socialAuthState => socialAuthState[attribute]
  )
}
