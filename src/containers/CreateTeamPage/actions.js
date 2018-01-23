import {
  CLEAR_STATE,
  CREATE_TEAM,
  SET_ERRORS,
  SET_NOTIFICATION_MESSAGE
} from './constants'

export function clearState() {
  return { type: CLEAR_STATE }
}

export function createTeam(data, redirectTo) {
  return { type: CREATE_TEAM, data, redirectTo }
}

export function setErrors(key, value) {
  return { type: SET_ERRORS, key, value }
}

export function setNotificationMessage(notificationMessage) {
  return { type: SET_NOTIFICATION_MESSAGE, notificationMessage }
}
