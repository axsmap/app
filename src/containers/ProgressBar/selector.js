import { createSelector } from 'reselect'

const selectProgressBar = state => state.progressBar

export default function makeSelectProgressBar(attribute) {
  return createSelector(
    selectProgressBar,
    progressBarState => progressBarState[attribute]
  )
}
