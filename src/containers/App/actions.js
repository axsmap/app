import {
  CHANGE_AUTHENTICATED,
  CHANGE_IS_AUTHENTICATING,
  CHANGE_USER_DATA,
  HANDLE_AUTHENTICATION
} from './constants'

export function changeAuthenticated(authenticated) {
  return { type: CHANGE_AUTHENTICATED, authenticated }
}

export function changeIsAuthenticating(isAuthenticating) {
  return { type: CHANGE_IS_AUTHENTICATING, isAuthenticating }
}

export function changeUserData(userData) {
  return { type: CHANGE_USER_DATA, userData }
}

export function handleAuthentication() {
  return { type: HANDLE_AUTHENTICATION }
}
