import {
  CLEAR_MESSAGE_ERRORS,
  SET_DATA,
  SET_ERRORS,
  SET_MESSAGE_TYPE,
  SET_SENDING_REQUEST,
  SIGN_IN_REQUEST,
  TOGGLE_SHOW_PASSWORD
} from './constants'

export function clearMessageErrors() {
  return { type: CLEAR_MESSAGE_ERRORS }
}

export function setData(key, value) {
  return { type: SET_DATA, key, value }
}

export function setErrors(key, value) {
  return { type: SET_ERRORS, key, value }
}

export function setMessageType(messageType) {
  return {
    type: SET_MESSAGE_TYPE,
    messageType
  }
}

export function setSendingRequest(sendingRequest) {
  return { type: SET_SENDING_REQUEST, sendingRequest }
}

export function signInRequest() {
  return { type: SIGN_IN_REQUEST }
}

export function toggleShowPassword() {
  return { type: TOGGLE_SHOW_PASSWORD }
}
