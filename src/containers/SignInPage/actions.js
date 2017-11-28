import {
  CLEAR_MESSAGE_ERRORS,
  CLEAR_STATE,
  SET_DATA,
  SET_ERRORS,
  SET_NOTIFICATION_MESSAGE,
  SIGN_IN_REQUEST,
  TOGGLE_SHOW_PASSWORD
} from './constants'

export function clearMessageErrors() {
  return { type: CLEAR_MESSAGE_ERRORS }
}

export function clearState() {
  return { type: CLEAR_STATE }
}

export function setData(key, value) {
  return { type: SET_DATA, key, value }
}

export function setErrors(key, value) {
  return { type: SET_ERRORS, key, value }
}

export function setNotificationMessage(notificationMessage) {
  return {
    type: SET_NOTIFICATION_MESSAGE,
    notificationMessage
  }
}

export function signInRequest() {
  return { type: SIGN_IN_REQUEST }
}

export function toggleShowPassword() {
  return { type: TOGGLE_SHOW_PASSWORD }
}
