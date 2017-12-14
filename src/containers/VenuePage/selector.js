import { createSelector } from 'reselect'

const selectVenue = state => state.venue

export default function makeSelectVenue(attribute) {
  return createSelector(selectVenue, venueState => venueState[attribute])
}
