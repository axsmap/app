import { forEach } from 'lodash'

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
    case CHANGE_DATA:
      return { ...state, data: { ...state.data, [action.key]: action.value } }

    case CLEAR:
      return {
        ...state,
        errorMessage: '',
        successMessage: '',
        errors: { email: '', password: '' }
      }

    case REQUEST_ERROR: {
      let errorMessage = ''
      let errors = { email: '', password: '' }
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

    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending }

    case TOGGLE_SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword }

    default:
      return state
  }
}
