import {
  AUTH_FAILED,
  SENDING_REQUEST,
  FACEBOOK_AUTH_REQUEST
} from './constants'

export function authFailed(failed) {
  return { type: AUTH_FAILED, authFailed: failed }
}

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending }
}

export function facebookAuthRequest(accessToken) {
  return { type: FACEBOOK_AUTH_REQUEST, accessToken }
}
