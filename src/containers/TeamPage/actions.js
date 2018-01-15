import {
  CREATE_PETITION,
  EDIT_TEAM,
  GET_TEAM,
  GET_USERS,
  SET_EDIT_IS_VISIBLE,
  SET_ERRORS,
  SET_LOADING_USERS,
  SET_NOTIFICATION_MESSAGE,
  SET_PETITION_SENT,
  SET_TEAM,
  SET_USERS
} from './constants'

export function createPetition(data) {
  return { type: CREATE_PETITION, data }
}

export function editTeam(teamId, data) {
  return { type: EDIT_TEAM, teamId, data }
}

export function getTeam(teamId) {
  return { type: GET_TEAM, teamId }
}

export function getUsers(keywords) {
  return { type: GET_USERS, keywords }
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

export function setLoadingUsers(loadingUsers) {
  return { type: SET_LOADING_USERS, loadingUsers }
}

export function setNotificationMessage(notificationMessage) {
  return { type: SET_NOTIFICATION_MESSAGE, notificationMessage }
}

export function setPetitionSent(petitionSent) {
  return { type: SET_PETITION_SENT, petitionSent }
}

export function setTeam(team) {
  return { type: SET_TEAM, team }
}

export function setUsers(users) {
  return { type: SET_USERS, users }
}
