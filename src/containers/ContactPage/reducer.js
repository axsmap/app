import { CLEAR_ERRORS, CLEAR_STATE, SET_ERROR } from './constants'

const initialState = {
  errors: {
    email: '',
    message: '',
    name: ''
  }
}

export default function contactReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return { ...state, errors: initialState.errors }

    case CLEAR_STATE:
      return initialState

    case SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    default:
      return state
  }
}
