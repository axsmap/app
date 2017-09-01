import {
  AUTH_FAILED,
  FACEBOOK_AUTH_REQUEST,
  GOOGLE_AUTH_REQUEST
} from './constants'

export function authFailed(failed) {
  return { type: AUTH_FAILED, authFailed: failed }
}

export function facebookAuthRequest(code) {
  return { type: FACEBOOK_AUTH_REQUEST, code }
}

export function googleAuthRequest(code) {
  return { type: GOOGLE_AUTH_REQUEST, code }
}
