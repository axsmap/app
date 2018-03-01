import {
  CLEAR_INVITATIONS_STATE,
  CLEAR_STATE,
  CREATE_PETITION,
  EDIT_TEAM,
  GET_TEAM,
  GET_USERS,
  JOIN_TEAM,
  PROMOTE_MEMBER,
  REMOVE_MANAGER,
  REMOVE_MEMBER,
  SET_EDIT_IS_VISIBLE,
  SET_ERRORS,
  SET_LOADING_TEAM,
  SET_LOADING_USERS,
  SET_NOTIFICATION_MESSAGE,
  SET_TEAM,
  SET_USERS
} from './constants'

export function clearInvitationsState() {
  return { type: CLEAR_INVITATIONS_STATE }
}

export function clearState() {
  return { type: CLEAR_STATE }
}

export function createPetition(userId) {
  return { type: CREATE_PETITION, userId }
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

export function joinTeam(teamId, userId) {
  return { type: JOIN_TEAM, teamId, userId }
}

export function promoteMember(teamId, userId) {
  return { type: PROMOTE_MEMBER, teamId, userId }
}

export function removeManager(teamId, userId) {
  return { type: REMOVE_MANAGER, teamId, userId }
}

export function removeMember(teamId, userId) {
  return { type: REMOVE_MEMBER, teamId, userId }
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

export function setLoadingTeam(loadingTeam) {
  return { type: SET_LOADING_TEAM, loadingTeam }
}

export function setLoadingUsers(loadingUsers) {
  return { type: SET_LOADING_USERS, loadingUsers }
}

export function setNotificationMessage(notificationMessage) {
  return { type: SET_NOTIFICATION_MESSAGE, notificationMessage }
}

export function setTeam(team) {
  return { type: SET_TEAM, team }
}

export function setUsers(users) {
  return { type: SET_USERS, users }
}
