import {
  CLEAR_STATE,
  CREATE_MAPATHON,
  GET_TEAMS,
  GET_USER_LOCATION,
  SET_ERRORS,
  SET_LOADING_TEAMS,
  SET_LOCATION_COORDINATES,
  SET_NOTIFICATION_MESSAGE,
  SET_TEAMS
} from './constants'

export function clearState() {
  return { type: CLEAR_STATE }
}

export function createMapathon(data, redirectTo) {
  return { type: CREATE_MAPATHON, data, redirectTo }
}

export function getTeams(keywords) {
  return { type: GET_TEAMS, keywords }
}

export function getUserLocation() {
  return { type: GET_USER_LOCATION }
}

export function setErrors(key, value) {
  return { type: SET_ERRORS, key, value }
}

export function setLoadingTeams(loadingTeams) {
  return { type: SET_LOADING_TEAMS, loadingTeams }
}

export function setLocationCoordinates(locationCoordinates) {
  return { type: SET_LOCATION_COORDINATES, locationCoordinates }
}

export function setNotificationMessage(notificationMessage) {
  return { type: SET_NOTIFICATION_MESSAGE, notificationMessage }
}

export function setTeams(teams) {
  return { type: SET_TEAMS, teams }
}
