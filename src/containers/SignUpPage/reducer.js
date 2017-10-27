import { forEach } from 'lodash'

import {
  CLEAR,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SENDING_REQUEST,
  SET_DATA,
  SET_ERRORS,
  TOGGLE_IS_SUBSCRIBED,
  TOGGLE_SHOW_PASSWORD
} from './constants'

const initialState = {
  successMessage: '',
  errorMessage: '',
  bruteForceMessage: '',
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
  showPassword: false,
  currentlySending: false
}

export default function signUpReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR:
      return {
        ...state,
        successMessage: '',
        errorMessage: '',
        bruteForceMessage: '',
        errors: { email: '', firstName: '', lastName: '', password: '' }
      }

    case REQUEST_SUCCESS:
      return { ...state, successMessage: action.successMessage }

    case REQUEST_ERROR: {
      let errorMessage = ''
      let errors = { email: '', firstName: '', lastName: '', password: '' }
      let bruteForceMessage = ''
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

    case TOGGLE_IS_SUBSCRIBED:
      return {
        ...state,
        data: { ...state.data, isSubscribed: !state.data.isSubscribed }
      }

    default:
      return state
  }
}
