import {
  ADD_VENUES,
  ADD_VISIBLE_VENUES,
  CLEAR_STATE,
  GET_VENUES,
  SET_LOADING_MAP,
  SET_LOCATION,
  SET_NEXT_PAGE,
  SET_SHOW_SEARCH_HERE,
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

export function getVenues() {
  return { type: GET_VENUES }
}

export function setLoadingMap(loadingMap) {
  return { type: SET_LOADING_MAP, loadingMap }
}

export function setLocation(location) {
  return { type: SET_LOCATION, location }
}

export function setNextPage(nextPage) {
  return { type: SET_NEXT_PAGE, nextPage }
}

export function setShowSearchHere(showSearchHere) {
  return { type: SET_SHOW_SEARCH_HERE, showSearchHere }
}

export function setVenues(venues) {
  return { type: SET_VENUES, venues }
}

export function setVisibleVenues(visibleVenues) {
  return { type: SET_VISIBLE_VENUES, visibleVenues }
}
