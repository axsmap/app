import { SET_WELCOME_ADDRESS } from './constants'

export function setWelcomeAddress(address) {
  return { type: SET_WELCOME_ADDRESS, address }
}
