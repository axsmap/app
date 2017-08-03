import {
  CHANGE_DATA,
  CLEAR,
  REQUEST_ERROR,
  SENDING_REQUEST,
  TOGGLE_SHOW_PASSWORD
} from './constants'

const initialState = {
  errorMessage: '',
  data: {
    email: '',
    password: ''
  },
  showPassword: false,
  currentlySending: false
}

export default function signInReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DATA:
      return { ...state, data: { ...state.data, [action.key]: action.value } }

    case CLEAR:
      return {
        ...state,
        errorMessage: '',
        successMessage: '',
        errors: { email: '', password: '' }
      }

    case REQUEST_ERROR:
      return { ...state, errorMessage: action.errorMessage }

    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending }

    case TOGGLE_SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword }

    default:
      return state
  }
}
