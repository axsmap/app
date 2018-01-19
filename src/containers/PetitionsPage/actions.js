import {
  ADD_PETITIONS,
  CHANGE_FILTER,
  CLEAR_STATE,
  EDIT_PETITION,
  GET_PETITIONS,
  SET_LOADING_PETITIONS,
  SET_NEXT_PAGE,
  SET_NOTIFICATION_MESSAGE,
  SET_PETITIONS
} from './constants'

export function addPetitions(petitions) {
  return { type: ADD_PETITIONS, petitions }
}

export function clearState() {
  return { type: CLEAR_STATE }
}

export function getPetitions() {
  return { type: GET_PETITIONS }
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

export function setNotificationMessage(notificationMessage) {
  return { type: SET_NOTIFICATION_MESSAGE, notificationMessage }
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
