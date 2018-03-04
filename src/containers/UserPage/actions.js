import {
  CLEAR_STATE,
  EDIT_USER,
  GET_USER,
  LEAVE_MAPATHON,
  LEAVE_TEAM,
  SET_EDIT_IS_VISIBLE,
  SET_ERRORS,
  SET_LOADING_USER,
  SET_NOTIFICATION_MESSAGE,
  SET_USER,
  SIGN_OUT,
  CLEAR_PETITIONS_STATE,
  ADD_PETITIONS,
  CHANGE_PETITION_STATE,
  GET_PETITIONS,
  REMOVE_PETITION,
  CHANGE_FILTER,
  SET_LOADING_PETITIONS,
  SET_NEXT_PAGE,
  EDIT_PETITION,
  SET_PETITIONS
} from './constants'

export function clearState() {
  return { type: CLEAR_STATE }
}

export function editUser(data) {
  return { type: EDIT_USER, data }
}

export function getUser(userId) {
  return { type: GET_USER, userId }
}

export function leaveMapathon(mapathonId) {
  return { type: LEAVE_MAPATHON, mapathonId }
}

export function leaveTeam(teamId) {
  return { type: LEAVE_TEAM, teamId }
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

export function setLoadingUser(loadingUser) {
  return { type: SET_LOADING_USER, loadingUser }
}

export function setNotificationMessage(notificationMessage) {
  return { type: SET_NOTIFICATION_MESSAGE, notificationMessage }
}

export function setUser(user) {
  return { type: SET_USER, user }
}

export function signOut() {
  return { type: SIGN_OUT }
}

export function clearPetitionsState() {
  return { type: CLEAR_PETITIONS_STATE }
}

export function addPetitions(petitions) {
  return { type: ADD_PETITIONS, petitions }
}

export function changePetitionState(id, state) {
  return { type: CHANGE_PETITION_STATE, id, state }
}

export function getPetitions() {
  return { type: GET_PETITIONS }
}

export function removePetition(id) {
  return { type: REMOVE_PETITION, id }
}

export function setFilterReceived() {
  return { type: CHANGE_FILTER, filter: 'received' }
}

export function setFilterSent() {
  return { type: CHANGE_FILTER, filter: 'sent' }
}

export function setLoadingPetitions(loadingPetitions) {
  return { type: SET_LOADING_PETITIONS, loadingPetitions }
}

export function setNextPage(nextPage) {
  return { type: SET_NEXT_PAGE, nextPage }
}

export function setPetitionAccepted(id) {
  return { type: EDIT_PETITION, data: { state: 'accepted', id } }
}

export function setPetitionCanceled(id) {
  return { type: EDIT_PETITION, data: { state: 'canceled', id } }
}

export function setPetitionRejected(id) {
  return { type: EDIT_PETITION, data: { state: 'rejected', id } }
}

export function setPetitions(petitions) {
  return { type: SET_PETITIONS, petitions }
}
