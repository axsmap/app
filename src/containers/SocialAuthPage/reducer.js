import { AUTH_FAILED } from './constants'

const initialState = {
  authFailed: false
}

export default function socialAuthReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_FAILED:
      return { ...state, authFailed: action.authFailed }

    default:
      return state
  }
}
