import { forEach } from 'lodash'

import {
  CLEAR,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  SENDING_REQUEST,
  SET_DATA,
  SET_ERRORS,
  TOGGLE_SHOW_PASSWORD
} from './constants'

const initialState = {
  successMessage: '',
  errorMessage: '',
  bruteForceMessage: '',
  data: {
    password: ''
  },
  errors: {
    password: ''
  },
  showPassword: false,
  success: false,
  currentlySending: false
}

export default function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR:
      return {
        ...state,
        successMessage: '',
        errorMessage: '',
        bruteForceMessage: '',
        errors: { password: '' }
      }

    case TOGGLE_SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword }

    case REQUEST_SUCCESS:
      return { ...state, successMessage: action.successMessage }

    case REQUEST_ERROR: {
      let errorMessage = ''
      let bruteForceMessage = ''
      let errors = { password: '' }
      forEach(action.errorData, (value, key) => {
        if (key !== 'message' && key !== 'error') {
          errors = { ...errors, [key]: value }
        } else if (key === 'error') {
          bruteForceMessage = value.text
        } else {
          errorMessage = value
        }
      })

      return { ...state, errorMessage, bruteForceMessage, errors }
    }

    case RESET_PASSWORD_SUCCESS:
      return { ...state, success: action.success }

    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending }

    case SET_DATA:
      return { ...state, data: { ...state.data, [action.key]: action.value } }

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    default:
      return state
  }
}
