import {
  CLEAR_FORM,
  CLEAR_MESSAGES,
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

function reducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_MESSAGES:
      return { ...state, errorMessage: '', successMessage: '' }
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
      return { ...state, successMessage: action.message }
    case REQUEST_ERROR:
      if (action.key !== 'message') {
        return {
          ...state,
          errors: { ...state.errors, [action.key]: action.value }
        }
      }

      return { ...state, errorMessage: action.value }
    default:
      return state
  }
}

export default reducer
