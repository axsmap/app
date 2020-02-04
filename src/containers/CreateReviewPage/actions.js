import {
  CLEAR_ERRORS,
  CLEAR_STATE,
  CREATE_PHOTO,
  CREATE_REVIEW,
  DELETE_PHOTO,
  GET_VENUE,
  SET_ERRORS,
  SET_LOADING_VENUE,
  SET_PHOTO,
  SET_VENUE,
  SET_HOW_TO_RATE_VISIBILITY
} from './constants'

export function clearErrors() {
  return { type: CLEAR_ERRORS }
}

export function clearState() {
  return { type: CLEAR_STATE }
}

export function createPhoto(data) {
  return { type: CREATE_PHOTO, data }
}

export function createReview(data, redirectTo) {
  return { type: CREATE_REVIEW, data, redirectTo }
}

export function deletePhoto() {
  return { type: DELETE_PHOTO }
}

export function getVenue(placeId) {
  return { type: GET_VENUE, placeId }
}

export function setErrors(key, value) {
  return { type: SET_ERRORS, key, value }
}

export function setLoadingVenue(loadingVenue) {
  return { type: SET_LOADING_VENUE, loadingVenue }
}

export function setVenue(venue) {
  return { type: SET_VENUE, venue }
}

export function setPhoto(photo) {
  return { type: SET_PHOTO, photo }
}

export function setHowToRateVisibility(howToRateVisibility) {
  return { type: SET_HOW_TO_RATE_VISIBILITY, howToRateVisibility }
}
