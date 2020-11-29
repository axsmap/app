import { SET_WELCOME_ADDRESS, SET_WELCOME_NAME } from './constants'

export function setWelcomeAddress(address) {
  return { type: SET_WELCOME_ADDRESS, address }
}

export function setWelcomeName(name) {
  return { type: SET_WELCOME_NAME, name }
}
