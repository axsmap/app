import {
  CLEAR_ERRORS,
  CLEAR_STATE,
  SET_ERRORS,
  SET_LOADING_VENUE,
  SET_PHOTO,
  SET_VENUE
} from './constants'

const initialState = {
  loadingVenue: true,
  venue: {},
  errors: {
    comments: ''
  },
  photo: ''
}

export default function createReviewReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return { ...state, errors: initialState.errors }

    case CLEAR_STATE:
      return initialState

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    case SET_LOADING_VENUE:
      return { ...state, loadingVenue: action.loadingVenue }

    case SET_PHOTO:
      return { ...state, photo: action.photo }

    case SET_VENUE:
      return { ...state, venue: action.venue }

    default:
      return state
  }
}
