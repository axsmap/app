import {
  CLEAR_MESSAGE_ERRORS,
  CLEAR_STATE,
  RESET_PASSWORD_REQUEST,
  SET_DATA,
  SET_ERRORS,
  TOGGLE_SHOW_PASSWORD
} from './constants'

export function clearMessageErrors() {
  return { type: CLEAR_MESSAGE_ERRORS }
}

export function clearState() {
  return { type: CLEAR_STATE }
}

export function resetPasswordRequest(key, redirectTo) {
  return { type: RESET_PASSWORD_REQUEST, key, redirectTo }
}

export function setData(key, value) {
  return { type: SET_DATA, key, value }
}

export function setErrors(key, value) {
  return { type: SET_ERRORS, key, value }
}

export function toggleShowPassword() {
  return { type: TOGGLE_SHOW_PASSWORD }
}
