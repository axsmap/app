import {
  CHANGE_DATA,
  CLEAR,
  FORGOTTEN_PASSWORD_REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SENDING_REQUEST
} from './constants'

export function clearMessages() {
  return { type: CLEAR }
}

export function changeData(key, value) {
  return { type: CHANGE_DATA, key, value }
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

export function forgottenPasswordRequest() {
  return { type: FORGOTTEN_PASSWORD_REQUEST }
}
