import {
  CLEAR_STATE,
  SET_ERRORS,
  SET_LOADING_PHOTO,
  SET_NOTIFICATION_MESSAGE
} from './constants'

const initialState = {
  notificationMessage: '',
  errors: {
    name: '',
    description: '',
    avatar: ''
  },
  loadingPhoto: false
}

export default function topBarReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    case SET_LOADING_PHOTO:
      return { ...state, loadingPhoto: action.loadingPhoto }

    case SET_NOTIFICATION_MESSAGE:
      return { ...state, notificationMessage: action.notificationMessage }

    default:
      return state
  }
}
