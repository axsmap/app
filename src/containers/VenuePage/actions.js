import {
  CLEAR_STATE,
  GET_VENUE,
  SET_LOADING_VENUE,
  SET_VENUE,
  SET_WELCOME_VISIBILITY,
  SET_USES_VISIBILITY
} from './constants'

export function clearState() {
  return { type: CLEAR_STATE }
}

export function getVenue(placeId) {
  return { type: GET_VENUE, placeId }
}

export function setLoadingVenue(loadingVenue) {
  return { type: SET_LOADING_VENUE, loadingVenue }
}

export function setVenue(venue) {
  return { type: SET_VENUE, venue }
}

export function setWelcomeVisibility(welcomeVisibility) {
  return { type: SET_WELCOME_VISIBILITY, welcomeVisibility }
}

export function setUsesVisibility(usesVisibility) {
  return { type: SET_USES_VISIBILITY, usesVisibility }
}
