import { createSelector } from 'reselect'

const selectHome = state => state.home

export default function makeSelectHome(attribute) {
  return createSelector(selectHome, homeState => homeState[attribute])
}
