import {
  CLEAR_MESSAGE_ERRORS,
  SET_DATA,
  SET_ERRORS,
  SET_MESSAGE_TYPE,
  SET_SENDING_REQUEST
} from './constants'

const initialState = {
  messageType: '',
  data: {
    email: ''
  },
  errors: {
    email: ''
  },
  sendingRequest: false
}

export default function forgottenPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_MESSAGE_ERRORS:
      return { ...state, messageType: '', errors: { email: '' } }

    case SET_DATA:
      return { ...state, data: { ...state.data, [action.key]: action.value } }

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    case SET_MESSAGE_TYPE:
      return { ...state, messageType: action.messageType }

    case SET_SENDING_REQUEST:
      return { ...state, sendingRequest: action.sendingRequest }

    default:
      return state
  }
}
