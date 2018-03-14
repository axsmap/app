import { CLEAR_ERRORS, CLEAR_STATE, SET_AVATAR, SET_ERRORS } from './constants'

const initialState = {
  avatar: '',
  errors: {
    name: '',
    description: ''
  }
}

export default function topBarReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return { ...state, errors: initialState.errors }

    case CLEAR_STATE:
      return initialState

    case SET_AVATAR:
      return { ...state, avatar: action.avatar }

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    default:
      return state
  }
}
