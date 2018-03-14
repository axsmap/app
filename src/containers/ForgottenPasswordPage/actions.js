import {
  CLEAR_MESSAGE_ERRORS,
  CLEAR_STATE,
  FORGOTTEN_PASSWORD_REQUEST,
  SET_DATA,
  SET_ERRORS
} from './constants'

export function clearMessageErrors() {
  return { type: CLEAR_MESSAGE_ERRORS }
}

export function clearState() {
  return { type: CLEAR_STATE }
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
