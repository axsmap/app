import { createSelector } from 'reselect'

const selectContact = state => state.contact

export default function makeSelectContact(attribute) {
  return createSelector(selectContact, contactState => contactState[attribute])
}
