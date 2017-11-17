import {
  ADD_VENUES,
  ADD_VISIBLE_VENUES,
  CLEAR_STATE,
  GET_USER_LOCATION,
  GET_VENUES,
  SET_CENTER_LOCATION,
  SET_LOADING_MAP,
  SET_NEXT_PAGE,
  SET_SHOW_SEARCH_HERE,
  SET_SHOW_USER_MARKER,
  SET_USER_LOCATION,
  SET_VENUES,
  SET_VISIBLE_VENUES
} from './constants'

export function addVenues(venues) {
  return { type: ADD_VENUES, venues }
}

export function addVisibleVenues(visibleVenues) {
  return { type: ADD_VISIBLE_VENUES, visibleVenues }
}

export function clearState() {
  return { type: CLEAR_STATE }
}

export function getUserLocation() {
  return { type: GET_USER_LOCATION }
}

export function getVenues() {
  return { type: GET_VENUES }
}

export function setCenterLocation(centerLocation) {
  return { type: SET_CENTER_LOCATION, centerLocation }
}

export function setLoadingMap(loadingMap) {
  return { type: SET_LOADING_MAP, loadingMap }
}

export function setNextPage(nextPage) {
  return { type: SET_NEXT_PAGE, nextPage }
}

export function setShowUserMarker(showUserMarker) {
  return { type: SET_SHOW_USER_MARKER, showUserMarker }
}

export function setShowSearchHere(showSearchHere) {
  return { type: SET_SHOW_SEARCH_HERE, showSearchHere }
}

export function setUserLocation(userLocation) {
  return { type: SET_USER_LOCATION, userLocation }
}

export function setVenues(venues) {
  return { type: SET_VENUES, venues }
}

export function setVisibleVenues(visibleVenues) {
  return { type: SET_VISIBLE_VENUES, visibleVenues }
}
