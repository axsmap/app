import { createSelector } from 'reselect'

const selectCreateTeam = state => state.createTeam

export default function makeSelect(attribute) {
  return createSelector(
    selectCreateTeam,
    createTeamState => createTeamState[attribute]
  )
}
