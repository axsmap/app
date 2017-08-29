import { AUTH_FAILED, SENDING_REQUEST } from './constants'

const initialState = {
  authFailed: false,
  currentlySending: false
}

export default function facebookAuthReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_FAILED:
      return { ...state, authFailed: action.authFailed }

    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending }

    default:
      return state
  }
}
