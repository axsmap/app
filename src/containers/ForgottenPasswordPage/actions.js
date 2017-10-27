import {
  CLEAR,
  FORGOTTEN_PASSWORD_REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SENDING_REQUEST,
  SET_DATA,
  SET_ERRORS
} from './constants'

export function clearMessages() {
  return { type: CLEAR }
}

export function forgottenPasswordRequest() {
  return { type: FORGOTTEN_PASSWORD_REQUEST }
}

export function requestError(errorData) {
  return { type: REQUEST_ERROR, errorData }
}

export function requestSuccess(successMessage) {
  return { type: REQUEST_SUCCESS, successMessage }
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
