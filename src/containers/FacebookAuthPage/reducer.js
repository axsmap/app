import { REQUEST_ERROR, REQUEST_SUCCESS, SENDING_REQUEST } from './constants'

const initialState = {
  successMessage: '',
  errorMessage: '',
  currentlySending: false
}

export default function facebookAuthReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SUCCESS:
      return { ...state, successMessage: action.successMessage }

    case REQUEST_ERROR: {
      const errorMessage = action.errorData.message
      return { ...state, errorMessage }
    }

    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending }

    default:
      return state
  }
}
