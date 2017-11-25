import {
  CLEAR_MESSAGE_ERRORS,
  CLEAR_STATE,
  SET_DATA,
  SET_ERRORS,
  SET_NOTIFICATION_MESSAGE
} from './constants'

const initialState = {
  notificationMessage: '',
  data: {
    email: ''
  },
  errors: {
    email: ''
  }
}

export default function forgottenPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_MESSAGE_ERRORS:
      return { ...state, errors: { email: '' } }

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

    default:
      return state
  }
}
