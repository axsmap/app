import {
  CHANGE_DATA,
  CLEAR,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SENDING_REQUEST,
  SIGN_UP_REQUEST,
  TOGGLE_IS_SUBSCRIBED,
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

export function requestSuccess(successMessage) {
  return { type: REQUEST_SUCCESS, successMessage }
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending }
}

export function signUpRequest() {
  return { type: SIGN_UP_REQUEST }
}

export function toggleIsSubscribed() {
  return { type: TOGGLE_IS_SUBSCRIBED }
}

export function toggleShowPassword() {
  return { type: TOGGLE_SHOW_PASSWORD }
}
