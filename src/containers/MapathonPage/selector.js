import { createSelector } from 'reselect'

const selectMapathon = state => state.mapathon

export default function makeSelectMapathon(attribute) {
  return createSelector(
    selectMapathon,
    mapathonState => mapathonState[attribute]
  )
}
