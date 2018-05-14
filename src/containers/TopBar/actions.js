import {
  SET_ADDRESS,
  SET_KEYWORDS,
  SET_SHOW_DROPDOWN,
  SIGN_OUT_REQUEST
} from './constants'

export function setAddress(address) {
  return { type: SET_ADDRESS, address }
}

export function setKeywords(keywords) {
  return { type: SET_KEYWORDS, keywords }
}

export function setShowDropdow(showDropdown) {
  return { type: SET_SHOW_DROPDOWN, showDropdown }
}

export function signOutRequest() {
  return { type: SIGN_OUT_REQUEST }
}
