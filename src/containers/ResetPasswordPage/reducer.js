import { forEach } from 'lodash'

import {
  CHANGE_DATA,
  CLEAR,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  SENDING_REQUEST,
  TOGGLE_SHOW_PASSWORD
} from './constants'

const initialState = {
  successMessage: '',
  errorMessage: '',
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
        errorMessage: '',
        successMessage: '',
        errors: { password: '' }
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
      let errorMessage = ''
      let errors = { password: '' }
      forEach(action.errorData, (value, key) => {
        if (key !== 'message') {
          errors = {
            ...errors,
            [key]: value
          }
        } else {
          errorMessage = value
        }
      })

      return { ...state, errorMessage, errors }
    }

    case RESET_PASSWORD_SUCCESS:
      return { ...state, success: action.success }

    default:
      return state
  }
}
