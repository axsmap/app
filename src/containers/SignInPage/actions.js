import {
  CLEAR,
  REQUEST_ERROR,
  SENDING_REQUEST,
  SET_DATA,
  SET_ERRORS,
  SIGN_IN_REQUEST,
  TOGGLE_SHOW_PASSWORD
} from './constants'

export function clearMessages() {
  return { type: CLEAR }
}

export function requestError(errorData) {
  return { type: REQUEST_ERROR, errorData }
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

export function signInRequest() {
  return { type: SIGN_IN_REQUEST }
}

export function toggleShowPassword() {
  return { type: TOGGLE_SHOW_PASSWORD }
}
