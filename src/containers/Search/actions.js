import {
  ADD_VENUES,
  ADD_VISIBLE_VENUES,
  GET_LOCATION,
  GET_VENUES_REQUEST,
  LOAD_VENUES,
  SET_CURRENTLY_SENDING,
  SET_INPUT,
  SET_LOADING_VENUES,
  SET_LOCATION_ERROR,
  SET_LOCATION,
  SET_NEXT_PAGE,
  SET_SHOW_FILTERS,
  SET_VENUE_TYPE,
  SET_VENUES,
  SET_VISIBLE_VENUES,
  TOGGLE_SHOW_FILTERS
} from './constants'

export function addVenues(venues) {
  return { type: ADD_VENUES, venues }
}

export function addVisibleVenues(visibleVenues) {
  return { type: ADD_VISIBLE_VENUES, visibleVenues }
}

export function getLocation() {
  return { type: GET_LOCATION }
}

export function getVenuesRequest() {
  return { type: GET_VENUES_REQUEST }
}

export function loadVenues() {
  return { type: LOAD_VENUES }
}

export function setCurrentlySending(currentlySending) {
  return { type: SET_CURRENTLY_SENDING, currentlySending }
}

export function setInput(input) {
  return { type: SET_INPUT, input }
}

export function setLoadingVenues(loadingVenues) {
  return { type: SET_LOADING_VENUES, loadingVenues }
}

export function setLocation(location) {
  return { type: SET_LOCATION, location }
}

export function setLocationError(locationError) {
  return { type: SET_LOCATION_ERROR, locationError }
}

export function setNextPage(nextPage) {
  return { type: SET_NEXT_PAGE, nextPage }
}

export function setShowFilters(showFilters) {
  return { type: SET_SHOW_FILTERS, showFilters }
}

export function setVenueType(venueType) {
  return { type: SET_VENUE_TYPE, venueType }
}

export function setVenues(venues) {
  return { type: SET_VENUES, venues }
}

export function setVisibleVenues(visibleVenues) {
  return { type: SET_VISIBLE_VENUES, visibleVenues }
}

export function toggleShowFilters() {
  return { type: TOGGLE_SHOW_FILTERS }
}
