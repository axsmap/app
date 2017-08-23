import {
  GET_LOCATION,
  GET_VENUES_REQUEST,
  SET_CURRENTLY_SENDING,
  SET_INPUT,
  SET_LOCATION_ERROR,
  SET_LOCATION,
  SET_VENUES,
  SET_SHOW_FILTERS,
  SET_VENUE_TYPE,
  TOGGLE_SHOW_FILTERS
} from './constants'

export function getLocation() {
  return { type: GET_LOCATION }
}

export function getVenuesRequest() {
  return { type: GET_VENUES_REQUEST }
}

export function setCurrentlySending(currentlySending) {
  return { type: SET_CURRENTLY_SENDING, currentlySending }
}

export function setInput(input) {
  return { type: SET_INPUT, input }
}

export function setLocation(location) {
  return { type: SET_LOCATION, location }
}

export function setLocationError(locationError) {
  return { type: SET_LOCATION_ERROR, locationError }
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

export function toggleShowFilters() {
  return { type: TOGGLE_SHOW_FILTERS }
}
