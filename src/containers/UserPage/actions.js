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
  SET_USER
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
