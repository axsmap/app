import {
  CLEAR_MESSAGE_ERRORS,
  CLEAR_STATE,
  SET_DATA,
  SET_ERRORS,
  SET_NOTIFICATION_MESSAGE,
  TOGGLE_SHOW_PASSWORD
} from './constants'

const initialState = {
  notificationMessage: '',
  data: {
    password: ''
  },
  errors: {
    password: ''
  },
  showPassword: false
}

export default function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_MESSAGE_ERRORS:
      return { ...state, errors: { password: '' } }

    case CLEAR_STATE:
      return initialState

    case SET_DATA:
      return { ...state, data: { ...state.data, [action.key]: action.value } }

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    case SET_NOTIFICATION_MESSAGE:
      return { ...state, notificationMessage: action.notificationMessage }

    case TOGGLE_SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword }

    default:
      return state
  }
}
