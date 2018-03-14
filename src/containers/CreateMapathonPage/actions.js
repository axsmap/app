import {
  CLEAR_ERRORS,
  CLEAR_STATE,
  CREATE_MAPATHON,
  CREATE_POSTER,
  DELETE_POSTER,
  GET_TEAMS,
  GET_USER_LOCATION,
  SET_ERRORS,
  SET_LOADING_TEAMS,
  SET_LOCATION_COORDINATES,
  SET_POSTER,
  SET_TEAMS
} from './constants'

export function clearErrors() {
  return { type: CLEAR_ERRORS }
}

export function clearState() {
  return { type: CLEAR_STATE }
}

export function createMapathon(data, redirectTo) {
  return { type: CREATE_MAPATHON, data, redirectTo }
}

export function createPoster(data) {
  return { type: CREATE_POSTER, data }
}

export function deletePoster() {
  return { type: DELETE_POSTER }
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

export function setPoster(poster) {
  return { type: SET_POSTER, poster }
}

export function setTeams(teams) {
  return { type: SET_TEAMS, teams }
}
