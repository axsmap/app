import {
  CLEAR_ERRORS,
  CLEAR_INVITATIONS_STATE,
  CLEAR_STATE,
  CREATE_PETITION,
  CREATE_POSTER,
  DELETE_POSTER,
  EDIT_MAPATHON,
  GET_MAPATHON,
  GET_TEAMS,
  GET_TEAMS_MANAGERS,
  GET_USERS,
  JOIN_MAPATHON,
  PROMOTE_PARTICIPANT,
  REMOVE_MANAGER,
  REMOVE_PARTICIPANT,
  REMOVE_TEAM,
  SET_EDIT_IS_VISIBLE,
  SET_ERRORS,
  SET_LOADING_MAPATHON,
  SET_LOADING_TEAMS,
  SET_LOADING_TEAMS_MANAGERS,
  SET_LOADING_USERS,
  SET_LOCATION_COORDINATES,
  SET_MAPATHON,
  SET_POSTER,
  SET_TEAMS,
  SET_TEAMS_MANAGERS,
  SET_USERS
} from './constants'

export function clearErrors() {
  return { type: CLEAR_ERRORS }
}

export function clearInvitationsState() {
  return { type: CLEAR_INVITATIONS_STATE }
}

export function clearState() {
  return { type: CLEAR_STATE }
}

export function createPetition(id, petitionType) {
  return { type: CREATE_PETITION, id, petitionType }
}

export function createPoster(data) {
  return { type: CREATE_POSTER, data }
}

export function deletePoster() {
  return { type: DELETE_POSTER }
}

export function editMapathon(mapathonId, data) {
  return { type: EDIT_MAPATHON, mapathonId, data }
}

export function getMapathon(mapathonId) {
  return { type: GET_MAPATHON, mapathonId }
}

export function getTeams(keywords) {
  return { type: GET_TEAMS, keywords }
}

export function getTeamsManagers(keywords) {
  return { type: GET_TEAMS_MANAGERS, keywords }
}

export function getUsers(keywords) {
  return { type: GET_USERS, keywords }
}

export function joinMapathon(mapathonId, userId) {
  return { type: JOIN_MAPATHON, mapathonId, userId }
}

export function promoteParticipant(mapathonId, userId) {
  return { type: PROMOTE_PARTICIPANT, mapathonId, userId }
}

export function removeManager(mapathonId, userId) {
  return { type: REMOVE_MANAGER, mapathonId, userId }
}

export function removeParticipant(mapathonId, userId) {
  return { type: REMOVE_PARTICIPANT, mapathonId, userId }
}

export function removeTeam(mapathonId, teamId) {
  return { type: REMOVE_TEAM, mapathonId, teamId }
}

export function setEditIsVisible(editIsVisible) {
  return {
    type: SET_EDIT_IS_VISIBLE,
    editIsVisible
  }
}

export function setErrors(key, value) {
  return { type: SET_ERRORS, key, value }
}

export function setLoadingMapathon(loadingMapathon) {
  return { type: SET_LOADING_MAPATHON, loadingMapathon }
}

export function setLoadingTeams(loadingTeams) {
  return { type: SET_LOADING_TEAMS, loadingTeams }
}

export function setLoadingTeamsManagers(loadingTeamsManagers) {
  return { type: SET_LOADING_TEAMS_MANAGERS, loadingTeamsManagers }
}

export function setLoadingUsers(loadingUsers) {
  return { type: SET_LOADING_USERS, loadingUsers }
}

export function setLocationCoordinates(locationCoordinates) {
  return { type: SET_LOCATION_COORDINATES, locationCoordinates }
}

export function setMapathon(mapathon) {
  return { type: SET_MAPATHON, mapathon }
}

export function setPoster(poster) {
  return { type: SET_POSTER, poster }
}

export function setTeams(teams) {
  return { type: SET_TEAMS, teams }
}

export function setTeamsManagers(teamsManagers) {
  return { type: SET_TEAMS_MANAGERS, teamsManagers }
}

export function setUsers(users) {
  return { type: SET_USERS, users }
}
