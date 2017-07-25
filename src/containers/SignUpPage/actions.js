import {
  CLEAR_FORM,
  CLEAR_MESSAGES,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SENDING_REQUEST,
  SIGN_UP_REQUEST,
  TOGGLE_IS_SUBSCRIBED,
  TOGGLE_SHOW_PASSWORD
} from './constants'

export function clearMessages() {
  return { type: CLEAR_MESSAGES }
}

export function clearForm() {
  return { type: CLEAR_FORM }
}

export function toggleShowPassword() {
  return { type: TOGGLE_SHOW_PASSWORD }
}

export function toggleIsSubscribed() {
  return { type: TOGGLE_IS_SUBSCRIBED }
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending }
}

export function signUpRequest(data) {
  return { type: SIGN_UP_REQUEST, data }
}

export function requestError(key, value) {
  return { type: REQUEST_ERROR, key, value }
}

export function requestSuccess(successMessage) {
  return { type: REQUEST_SUCCESS, successMessage }
}
