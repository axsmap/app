import {
  CLEAR_STATE,
  GET_VENUE,
  SET_NOTIFICATION_MESSAGE,
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

export function setVenue(venue) {
  return { type: SET_VENUE, venue }
}
