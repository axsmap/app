import {
  CLEAR_STATE,
  SET_LOADING_MAPATHON,
  SET_MAPATHON,
  SET_NOTIFICATION_MESSAGE
} from './constants'

const initialState = {
  notificationMessage: '',
  loadingMapathon: true,
  mapathon: {}
}

export default function mapathonReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState

    case SET_LOADING_MAPATHON:
      return { ...state, loadingMapathon: action.loadingMapathon }

    case SET_MAPATHON:
      return { ...state, mapathon: action.mapathon }

    case SET_NOTIFICATION_MESSAGE:
      return { ...state, notificationMessage: action.notificationMessage }

    default:
      return state
  }
}
