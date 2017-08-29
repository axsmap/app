import { createSelector } from 'reselect'

const selectSearch = state => state.search

export default function makeSelectSearch(attribute) {
  return createSelector(selectSearch, searchState => searchState[attribute])
}
