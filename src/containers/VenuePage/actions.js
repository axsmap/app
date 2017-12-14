import {
  CLEAR_STATE,
  GET_VENUE,
  SET_NOTIFICATION_MESSAGE,
  SET_SHOW_CREATE_REVIEW,
  SET_VENUE
} from './constants'

export function clearState() {
  return { type: CLEAR_STATE }
}

export function getVenue(placeId) {
  return { type: GET_VENUE, placeId }
}

export function setNotificationMessage(notificationMessage) {
  return { type: SET_NOTIFICATION_MESSAGE, notificationMessage }
}

export function setShowCreateReview(showCreateReview) {
  return { type: SET_SHOW_CREATE_REVIEW, showCreateReview }
}

export function setVenue(venue) {
  return { type: SET_VENUE, venue }
}
