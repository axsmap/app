import {
  SET_IS_AUTHENTICATED,
  SET_IS_AUTHENTICATING,
  SET_SENDING_REQUEST,
  SET_USER_DATA
} from './constants'

const initialState = {
  isAuthenticating: true,
  isAuthenticated: false,
  userData: {},
  sendingRequest: false
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.isAuthenticated }

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
