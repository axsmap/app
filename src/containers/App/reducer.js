import {
  CHANGE_AUTHENTICATED,
  CHANGE_IS_AUTHENTICATING,
  CHANGE_USER_DATA
} from './constants'

const initialState = {
  isAuthenticating: true,
  authenticated: false,
  userData: {
    id: '',
    avatar: '',
    firstName: ''
  }
}

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_AUTHENTICATED:
      return { ...state, authenticated: action.authenticated }

    case CHANGE_IS_AUTHENTICATING:
      return { ...state, isAuthenticating: action.isAuthenticating }

    case CHANGE_USER_DATA:
      return { ...state, userData: action.userData }

    default:
      return state
  }
}
