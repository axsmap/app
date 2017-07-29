import { forEach } from 'lodash'

import {
  CHANGE_DATA,
  CLEAR,
  CLEAR_FORM,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SENDING_REQUEST,
  TOGGLE_IS_SUBSCRIBED,
  TOGGLE_SHOW_PASSWORD
} from './constants'

const initialState = {
  successMessage: '',
  errorMessage: '',
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
        errorMessage: '',
        successMessage: '',
        errors: { email: '', firstName: '', lastName: '', password: '' }
      }

    case CLEAR_FORM:
      return {
        ...state,
        data: {
          email: '',
          firstName: '',
          isSubscribed: true,
          lastName: '',
          password: ''
        }
      }

    case CHANGE_DATA:
      return { ...state, data: { ...state.data, [action.key]: action.value } }

    case TOGGLE_SHOW_PASSWORD:
      return { ...state, showPassword: !state.showPassword }

    case TOGGLE_IS_SUBSCRIBED:
      return {
        ...state,
        data: { ...state.data, isSubscribed: !state.data.isSubscribed }
      }

    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending }

    case REQUEST_SUCCESS:
      return { ...state, successMessage: action.successMessage }

    case REQUEST_ERROR: {
      let errorMessage = ''
      let errors = { email: '', firstName: '', lastName: '', password: '' }
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

    default:
      return state
  }
}
