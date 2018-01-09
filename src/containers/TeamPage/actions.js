import { GET_TEAM, SET_NOTIFICATION_MESSAGE, SET_TEAM } from './constants'

export function getTeam(teamId) {
  return { type: GET_TEAM, teamId }
}

export function setNotificationMessage(notificationMessage) {
  return { type: SET_NOTIFICATION_MESSAGE, notificationMessage }
}

export function setTeam(team) {
  return { type: SET_TEAM, team }
}
