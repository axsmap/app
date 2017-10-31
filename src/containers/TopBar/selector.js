import { createSelector } from 'reselect'

const selectTopBar = state => state.topBar

export default function makeSelectTopBar(attribute) {
  return createSelector(selectTopBar, topBarState => topBarState[attribute])
}
