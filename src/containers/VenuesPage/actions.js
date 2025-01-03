import {
  ADD_VENUES,
  ADD_VISIBLE_VENUES,
  CLEAR_FILTERS,
  CLEAR_STATE,
  GET_USER_LOCATION,
  GET_VENUES,
  SET_CENTER_LOCATION,
  SET_FILTERS,
  SET_INCOMING_VENUES,
  SET_LIST_VISIBILITY,
  SET_LOADING_MAP,
  SET_LOADING_VENUES,
  SET_MAP_VISIBILITY,
  SET_NEXT_PAGE,
  SET_POPUP_VISIBILITY,
  SET_SHOW_SEARCH_HERE,
  SET_SHOW_USER_MARKER,
  SET_USER_LOCATION,
  SET_VENUES,
  SET_VISIBLE_VENUES,
  SET_WELCOME_VISIBILITY,
  SET_USES_VISIBILITY,
  SET_IS_NEARBY_SEARCH
} from './constants'

export function addVenues(venues) {
  return { type: ADD_VENUES, venues }
}

export function addVisibleVenues(visibleVenues) {
  return { type: ADD_VISIBLE_VENUES, visibleVenues }
}

export function clearFilters() {
  return { type: CLEAR_FILTERS }
}

export function clearState() {
  return { type: CLEAR_STATE }
}

export function getUserLocation() {
  return { type: GET_USER_LOCATION }
}

export function getVenues(loadMore = false) {
  return { type: GET_VENUES, loadMore }
}

export function setCenterLocation(centerLocation) {
  return { type: SET_CENTER_LOCATION, centerLocation }
}

export function setFilters(key, value) {
  return { type: SET_FILTERS, key, value }
}

export function setIncomingVenues(incomingVenues) {
  return { type: SET_INCOMING_VENUES, incomingVenues }
}

export function setListVisibility(listVisibility) {
  return { type: SET_LIST_VISIBILITY, listVisibility }
}

export function setLoadingMap(loadingMap) {
  return { type: SET_LOADING_MAP, loadingMap }
}

export function setLoadingVenues(loadingVenues) {
  return { type: SET_LOADING_VENUES, loadingVenues }
}

export function setMapVisibility(mapVisibility) {
  return { type: SET_MAP_VISIBILITY, mapVisibility }
}

export function setNextPage(nextPage) {
  return { type: SET_NEXT_PAGE, nextPage }
}

export function setIsNearbySearch(isNearbySearch) {
  return { type: SET_IS_NEARBY_SEARCH, isNearbySearch }
}

export function setPopupVisibility(popupVisibility) {
  return { type: SET_POPUP_VISIBILITY, popupVisibility }
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

export function setWelcomeVisibility(welcomeVisibility) {
  return { type: SET_WELCOME_VISIBILITY, welcomeVisibility }
}

export function setUsesVisibility(usesVisibility) {
  return { type: SET_USES_VISIBILITY, usesVisibility }
}
