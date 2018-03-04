import {
  CLEAR_STATE,
  SET_EDIT_IS_VISIBLE,
  SET_ERRORS,
  SET_LOADING_USER,
  SET_NOTIFICATION_MESSAGE,
  SET_USER
} from './constants'

const initialState = {
  notificationMessage: '',
  loadingUser: true,
  user: {},
  editIsVisible: false,
  errors: {
    avatar: '',
    description: '',
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    zip: ''
  }
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState

    case SET_EDIT_IS_VISIBLE:
      return { ...state, editIsVisible: action.editIsVisible }

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

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
