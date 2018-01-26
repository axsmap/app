import { createSelector } from 'reselect'

const selectMapathons = state => state.mapathons

export default function makeSelectMapathons(attribute) {
  return createSelector(
    selectMapathons,
    mapathonsState => mapathonsState[attribute]
  )
}
