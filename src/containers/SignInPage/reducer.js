import { forEach } from 'lodash'

import {
  CLEAR,
  REQUEST_ERROR,
  SENDING_REQUEST,
  SET_DATA,
  SET_ERRORS,
  TOGGLE_SHOW_PASSWORD
} from './constants'

const initialState = {
  errorMessage: '',
  bruteForceMessage: '',
  data: {
    email: '',
    password: ''
  },
  errors: {
    email: '',
    password: ''
  },
  showPassword: false,
  currentlySending: false,
  redirect: false
}

export default function signInReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR:
      return {
        ...state,
        successMessage: '',
        errorMessage: '',
        bruteForceMessage: '',
        errors: { email: '', password: '' }
      }

    case REQUEST_ERROR: {
      let errorMessage = ''
      let bruteForceMessage = ''
      let errors = { email: '', password: '' }
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

    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending }

    case SET_DATA:
      return { ...state, data: { ...state.data, [action.key]: action.value } }

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    case TOGGLE_SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword }

    default:
      return state
  }
}
