import {
  CLEAR_STATE,
  SET_LOADING_USER,
  SET_NOTIFICATION_MESSAGE,
  SET_USER
} from './constants'

const initialState = {
  notificationMessage: '',
  loadingUser: true,
  user: {}
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState

    case SET_LOADING_USER:
      return { ...state, loadingUser: action.loadingUser }

    case SET_NOTIFICATION_MESSAGE:
      return { ...state, notificationMessage: action.notificationMessage }

    case SET_USER:
      return { ...state, user: action.user }

    default:
      return state
  }
}
