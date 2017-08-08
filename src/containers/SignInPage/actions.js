import {
  CHANGE_DATA,
  CLEAR,
  REQUEST_ERROR,
  SENDING_REQUEST,
  SIGN_IN_REQUEST,
  TOGGLE_SHOW_PASSWORD
} from './constants'

export function changeData(key, value) {
  return { type: CHANGE_DATA, key, value }
}

export function clearMessages() {
  return { type: CLEAR }
}

export function requestError(errorData) {
  return { type: REQUEST_ERROR, errorData }
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending }
}

export function signInRequest() {
  return { type: SIGN_IN_REQUEST }
}

export function toggleShowPassword() {
  return { type: TOGGLE_SHOW_PASSWORD }
}
