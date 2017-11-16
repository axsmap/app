import { createSelector } from 'reselect'

const selectVenues = state => state.venues

export default function makeSelectVenues(attribute) {
  return createSelector(selectVenues, venuesState => venuesState[attribute])
}
