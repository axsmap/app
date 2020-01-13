import {
  CLEAR_STATE,
  GET_VENUE,
  SET_LOADING_VENUE,
  SET_VENUE
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
