import {
  HANDLE_AUTHENTICATION,
  SET_AUTHENTICATED,
  SET_IS_AUTHENTICATING,
  SET_SENDING_REQUEST,
  SET_USER_DATA
} from './constants'

export function handleAuthentication() {
  return { type: HANDLE_AUTHENTICATION }
}

export function setAuthenticated(authenticated) {
  return { type: SET_AUTHENTICATED, authenticated }
}

export function setIsAuthenticating(isAuthenticating) {
  return { type: SET_IS_AUTHENTICATING, isAuthenticating }
}

export function setSendingRequest(sendingRequest) {
  return { type: SET_SENDING_REQUEST, sendingRequest }
}

export function setUserData(userData) {
  return { type: SET_USER_DATA, userData }
}
