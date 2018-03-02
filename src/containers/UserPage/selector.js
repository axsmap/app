import { createSelector } from 'reselect'

const selectUser = state => state.user

export default function makeSelectUser(attribute) {
  return createSelector(selectUser, userState => userState[attribute])
}
