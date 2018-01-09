import { createSelector } from 'reselect'

const selectTeam = state => state.team

export default function makeSelectTeam(attribute) {
  return createSelector(selectTeam, teamState => teamState[attribute])
}
