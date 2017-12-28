import {
  CLEAR_STATE,
  CREATE_REVIEW,
  GET_VENUE,
  SET_CREATE_REVIEW_VISIBLE,
  SET_LOADING_PHOTO,
  SET_LOADING_VENUE,
  SET_NOTIFICATION_MESSAGE,
  SET_VENUE
} from './constants'

export function clearState() {
  return { type: CLEAR_STATE }
}

export function createReview(data) {
  return { type: CREATE_REVIEW, data }
}

export function getVenue(placeId) {
  return { type: GET_VENUE, placeId }
}

export function setCreateReviewVisible(createReviewVisible) {
  return {
    type: SET_CREATE_REVIEW_VISIBLE,
    createReviewVisible
  }
}

export function setLoadingPhoto(loadingPhoto) {
  return { type: SET_LOADING_PHOTO, loadingPhoto }
}

export function setLoadingVenue(loadingVenue) {
  return { type: SET_LOADING_VENUE, loadingVenue }
}

export function setNotificationMessage(notificationMessage) {
  return { type: SET_NOTIFICATION_MESSAGE, notificationMessage }
}

export function setVenue(venue) {
  return { type: SET_VENUE, venue }
}
