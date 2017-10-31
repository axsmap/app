import {
  CLEAR_QUERY,
  SET_CURRENT_URL,
  SET_QUERY,
  SET_SHOW_DROPDOWN,
  SIGN_OUT_REQUEST
} from './constants'

export function clearQuery() {
  return { type: CLEAR_QUERY }
}

export function setCurrentUrl(currentUrl) {
  return { type: SET_CURRENT_URL, currentUrl }
}

export function setQuery(key, value) {
  return { type: SET_QUERY, key, value }
}

export function setShowDropdow(showDropdown) {
  return { type: SET_SHOW_DROPDOWN, showDropdown }
}

export function signOutRequest() {
  return { type: SIGN_OUT_REQUEST }
}
