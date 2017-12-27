import {
  ADD_TEAMS,
  CLEAR_STATE,
  GET_TEAMS,
  SET_LOADING_TEAMS,
  SET_NEXT_PAGE,
  SET_NOTIFICATION_MESSAGE,
  SET_TEAMS
} from './constants'

export function addTeams(teams) {
  return { type: ADD_TEAMS, teams }
}

export function clearState() {
  return { type: CLEAR_STATE }
}

export function getTeams() {
  return { type: GET_TEAMS }
}

export function setLoadingTeams(loadingTeams) {
  return { type: SET_LOADING_TEAMS, loadingTeams }
}

export function setNextPage(nextPage) {
  return { type: SET_NEXT_PAGE, nextPage }
}

export function setNotificationMessage(notificationMessage) {
  return {
    type: SET_NOTIFICATION_MESSAGE,
    notificationMessage
  }
}

export function setTeams(teams) {
  return { type: SET_TEAMS, teams }
}
