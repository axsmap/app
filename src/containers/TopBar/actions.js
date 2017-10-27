import {
  CLEAR_QUERY,
  SET_CURRENT_URL,
  SET_QUERY,
  SET_SHOW_DROPDOWN,
  TOGGLE_SHOW_DROPDOWN
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

export function toggleShowDropdown() {
  return { type: TOGGLE_SHOW_DROPDOWN }
}
