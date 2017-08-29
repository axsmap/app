import {
  CHANGE_DATA,
  CLEAR,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SENDING_REQUEST,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  TOGGLE_SHOW_PASSWORD
} from './constants'

export function clearMessages() {
  return { type: CLEAR }
}

export function changeData(key, value) {
  return { type: CHANGE_DATA, key, value }
}

export function toggleShowPassword() {
  return { type: TOGGLE_SHOW_PASSWORD }
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending }
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
