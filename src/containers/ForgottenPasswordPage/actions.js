import {
  CLEAR_MESSAGE_ERRORS,
  FORGOTTEN_PASSWORD_REQUEST,
  SET_DATA,
  SET_ERRORS,
  SET_MESSAGE_TYPE,
  SET_SENDING_REQUEST
} from './constants'

export function clearMessageErrors() {
  return { type: CLEAR_MESSAGE_ERRORS }
}

export function forgottenPasswordRequest() {
  return { type: FORGOTTEN_PASSWORD_REQUEST }
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
