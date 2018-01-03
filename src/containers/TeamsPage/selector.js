import { createSelector } from 'reselect'

const selectTeams = state => state.teams

export default function makeSelectTeams(attribute) {
  return createSelector(selectTeams, teamsState => teamsState[attribute])
}
