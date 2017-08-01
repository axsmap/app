import {
  CHANGE_DATA,
  CLEAR,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SENDING_REQUEST,
  TOGGLE_SHOW_PASSWORD
} from './constants'

const initialState = {
  successMessage: '',
  errorMessage: '',
  data: {
    newPassword: ''
  },
  errors: {
    newPassword: ''
  },
  showPassword: false,
  currentlySending: false
}

export default function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR:
      return {
        ...state,
        errorMessage: '',
        successMessage: '',
        errors: { newPassword: '' }
      }

    case CHANGE_DATA:
      return { ...state, data: { ...state.data, [action.key]: action.value } }

    case TOGGLE_SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword }

    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending }

    case REQUEST_SUCCESS:
      return { ...state, successMessage: action.successMessage }

    case REQUEST_ERROR: {
      return { ...state, errorMessage: action.errorMessage }
    }

    default:
      return state
  }
}
