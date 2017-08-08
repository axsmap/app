import { createSelector } from 'reselect'

const selectApp = state => state.app

export default function makeSelectApp(attribute) {
  return createSelector(selectApp, appState => appState[attribute])
}
