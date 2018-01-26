import {
  ADD_MAPATHONS,
  CLEAR_STATE,
  SET_LOADING_MAPATHONS,
  SET_MAPATHONS,
  SET_NEXT_PAGE,
  SET_NOTIFICATION_MESSAGE
} from './constants'

const initialState = {
  notificationMessage: '',
  loadingMapathons: true,
  mapathons: [],
  nextPage: null
}

export default function mapathonsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MAPATHONS:
      return { ...state, mapathons: [...state.mapathons, ...action.mapathons] }

    case CLEAR_STATE:
      return initialState

    case SET_LOADING_MAPATHONS:
      return { ...state, loadingMapathons: action.loadingMapathons }

    case SET_MAPATHONS:
      return { ...state, mapathons: action.mapathons }

    case SET_NEXT_PAGE:
      return { ...state, nextPage: action.nextPage }

    case SET_NOTIFICATION_MESSAGE:
      return { ...state, notificationMessage: action.notificationMessage }

    default:
      return state
  }
}
