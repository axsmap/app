import { createSelector } from 'reselect'

const selectwelcomePage = state => state.welcomePage

export default function makeSelectwelcomePage(attribute) {
  return createSelector(
    selectwelcomePage,
    welcomePageState => welcomePageState[attribute]
  )
}
