import {
  CLEAR_MESSAGE_ERRORS,
  CLEAR_STATE,
  SET_DATA,
  SET_ERRORS,
  TOGGLE_IS_SUBSCRIBED,
  TOGGLE_SHOW_PASSWORD
} from './constants'

const initialState = {
  data: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isSubscribed: true
  },
  errors: {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  },
  showPassword: false
}

export default function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_MESSAGE_ERRORS:
      return {
        ...state,
        messageType: '',
        errors: { email: '', firstName: '', lastName: '', password: '' }
      }

    case CLEAR_STATE:
      return initialState

    case SET_DATA:
      return { ...state, data: { ...state.data, [action.key]: action.value } }

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    case TOGGLE_SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword }

    case TOGGLE_IS_SUBSCRIBED:
      return {
        ...state,
        data: { ...state.data, isSubscribed: !state.data.isSubscribed }
      }

    default:
      return state
  }
}
