import { CLEAR_ERRORS, CLEAR_STATE, SEND_EMAIL, SET_ERROR } from './constants'

export function clearErrors() {
  return { type: CLEAR_ERRORS }
}

export function clearState() {
  return { type: CLEAR_STATE }
}

export function sendEmail(data) {
  return { type: SEND_EMAIL, data }
}

export function setError(key, value) {
  return { type: SET_ERROR, key, value }
}
