import {
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SENDING_REQUEST,
  FACEBOOK_AUTH_REQUEST
} from './constants'

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending }
}

export function requestError(errorData) {
  return { type: REQUEST_ERROR, errorData }
}

export function requestSuccess(successMessage) {
  return { type: REQUEST_SUCCESS, successMessage }
}

export function facebookAuthRequest(accessToken) {
  return { type: FACEBOOK_AUTH_REQUEST, accessToken }
}
