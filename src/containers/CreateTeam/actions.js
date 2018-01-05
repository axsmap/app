import {
  CLEAR_STATE,
  CREATE_TEAM,
  SET_ERRORS,
  SET_LOADING_PHOTO,
  SET_NOTIFICATION_MESSAGE
} from './constants'

export function clearState() {
  return { type: CLEAR_STATE }
}

export function createTeam(data) {
  return { type: CREATE_TEAM, data }
}

export function setErrors(key, value) {
  return { type: SET_ERRORS, key, value }
}

export function setLoadingPhoto(loadingPhoto) {
  return { type: SET_LOADING_PHOTO, loadingPhoto }
}

export function setNotificationMessage(notificationMessage) {
  return { type: SET_NOTIFICATION_MESSAGE, notificationMessage }
}
