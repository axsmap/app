import { createSelector } from 'reselect'

const selectCreateMapathon = state => state.createMapathon

export default function makeSelectCreateMapathon(attribute) {
  return createSelector(
    selectCreateMapathon,
    createMapathonState => createMapathonState[attribute]
  )
}
