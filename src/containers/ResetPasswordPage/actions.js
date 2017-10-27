import {
  CLEAR,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SENDING_REQUEST,
  SET_DATA,
  SET_ERRORS,
  TOGGLE_SHOW_PASSWORD
} from './constants'

export function clearMessages() {
  return { type: CLEAR }
}

export function requestError(errorData) {
  return { type: REQUEST_ERROR, errorData }
}

export function requestSuccess(successMessage) {
  return { type: REQUEST_SUCCESS, successMessage }
}

export function resetPasswordRequest(key) {
  return { type: RESET_PASSWORD_REQUEST, key }
}

export function resetPasswordSuccess(success) {
  return { type: RESET_PASSWORD_SUCCESS, success }
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending }
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
