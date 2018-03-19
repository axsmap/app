import {
  CLEAR_STATE,
  CREATE_PHOTO,
  CREATE_REVIEW,
  DELETE_PHOTO,
  GET_VENUE,
  SET_CREATE_REVIEW_IS_VISIBLE,
  SET_LOADING_VENUE,
  SET_PHOTO,
  SET_VENUE
} from './constants'

export function clearState() {
  return { type: CLEAR_STATE }
}

export function createPhoto(data) {
  return { type: CREATE_PHOTO, data }
}

export function createReview(data) {
  return { type: CREATE_REVIEW, data }
}

export function deletePhoto() {
  return { type: DELETE_PHOTO }
}

export function getVenue(placeId) {
  return { type: GET_VENUE, placeId }
}

export function setCreateReviewIsVisible(createReviewIsVisible) {
  return {
    type: SET_CREATE_REVIEW_IS_VISIBLE,
    createReviewIsVisible
  }
}

export function setLoadingVenue(loadingVenue) {
  return { type: SET_LOADING_VENUE, loadingVenue }
}

export function setPhoto(photo) {
  return { type: SET_PHOTO, photo }
}

export function setVenue(venue) {
  return { type: SET_VENUE, venue }
}
