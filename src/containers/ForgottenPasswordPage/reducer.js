import { forEach } from 'lodash'

import {
  CHANGE_DATA,
  CLEAR,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SENDING_REQUEST
} from './constants'

const initialState = {
  successMessage: '',
  errorMessage: '',
  bruteForceMessage: '',
  data: {
    email: ''
  },
  errors: {
    email: ''
  },
  currentlySending: false
}

export default function forgottenPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DATA:
      return { ...state, data: { ...state.data, [action.key]: action.value } }

    case CLEAR:
      return {
        ...state,
        errorMessage: '',
        successMessage: '',
        bruteForceMessage: '',
        errors: { email: '' }
      }

    case REQUEST_SUCCESS:
      return { ...state, successMessage: action.successMessage }

    case REQUEST_ERROR: {
      let errorMessage = ''
      let bruteForceMessage = ''
      let errors = { email: '' }
      forEach(action.errorData, (value, key) => {
        if (key !== 'message' && key !== 'error') {
          errors = {
            ...errors,
            [key]: value
          }
        } else if (key === 'error') {
          bruteForceMessage = value
        } else {
          errorMessage = value
        }
      })

      return { ...state, errorMessage, bruteForceMessage, errors }
    }

    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending }

    default:
      return state
  }
}
