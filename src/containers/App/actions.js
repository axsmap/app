import {
  HANDLE_AUTHENTICATION,
  SET_IS_AUTHENTICATED,
  SET_IS_AUTHENTICATING,
  SET_SENDING_REQUEST,
  SET_USER_DATA
} from './constants'

export function handleAuthentication() {
  return { type: HANDLE_AUTHENTICATION }
}

export function setIsAuthenticated(isAuthenticated) {
  return { type: SET_IS_AUTHENTICATED, isAuthenticated }
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
