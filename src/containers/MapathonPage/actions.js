import {
  CLEAR_STATE,
  GET_MAPATHON,
  SET_LOADING_MAPATHON,
  SET_MAPATHON,
  SET_NOTIFICATION_MESSAGE
} from './constants'

export function clearState() {
  return { type: CLEAR_STATE }
}

export function getMapathon(mapathonId) {
  return { type: GET_MAPATHON, mapathonId }
}

export function setLoadingMapathon(loadingMapathon) {
  return { type: SET_LOADING_MAPATHON, loadingMapathon }
}

export function setMapathon(mapathon) {
  return { type: SET_MAPATHON, mapathon }
}

export function setNotificationMessage(notificationMessage) {
  return { type: SET_NOTIFICATION_MESSAGE, notificationMessage }
}
