import {
  SET_AUTHENTICATED,
  SET_IS_AUTHENTICATING,
  SET_SENDING_REQUEST,
  SET_USER_DATA
} from './constants'

const initialState = {
  isAuthenticating: true,
  authenticated: false,
  userData: {
    id: '',
    avatar: '',
    firstName: ''
  },
  sendingRequest: false
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, authenticated: action.authenticated }

    case SET_IS_AUTHENTICATING:
      return { ...state, isAuthenticating: action.isAuthenticating }

    case SET_SENDING_REQUEST:
      return { ...state, sendingRequest: action.sendingRequest }

    case SET_USER_DATA:
      return { ...state, userData: action.userData }

    default:
      return state
  }
}
