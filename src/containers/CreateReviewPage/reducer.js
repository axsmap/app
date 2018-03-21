import {
  CLEAR_STATE,
  SET_LOADING_VENUE,
  SET_PHOTO,
  SET_VENUE
} from './constants'

const initialState = {
  loadingVenue: true,
  venue: {},
  photo: ''
}

export default function createReviewReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState

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
