import {
  CLEAR_STATE,
  GET_USER,
  SET_LOADING_USER,
  SET_NOTIFICATION_MESSAGE,
  SET_USER
} from './constants'

export function clearState() {
  return { type: CLEAR_STATE }
}

export function getUser(userId) {
  return { type: GET_USER, userId }
}

export function setLoadingUser(loadingUser) {
  return { type: SET_LOADING_USER, loadingUser }
}

export function setNotificationMessage(notificationMessage) {
  return { type: SET_NOTIFICATION_MESSAGE, notificationMessage }
}

export function setUser(user) {
  return { type: SET_USER, user }
}
