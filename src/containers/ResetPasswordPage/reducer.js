import {
  CLEAR_MESSAGE_ERRORS,
  SET_DATA,
  SET_ERRORS,
  SET_MESSAGE_TYPE,
  TOGGLE_SHOW_PASSWORD
} from './constants'

const initialState = {
  messageType: '',
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
      return { ...state, messageType: '', errors: { password: '' } }

    case SET_DATA:
      return { ...state, data: { ...state.data, [action.key]: action.value } }

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    case SET_MESSAGE_TYPE:
      return { ...state, messageType: action.messageType }

    case TOGGLE_SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword }

    default:
      return state
  }
}
