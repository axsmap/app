import {
  ADD_MAPATHONS,
  CLEAR_STATE,
  SET_LOADING_MAPATHONS,
  SET_MAPATHONS,
  SET_NEXT_PAGE
} from './constants'

const initialState = {
  loadingMapathons: true,
  mapathons: [],
  nextPage: null
}

export default function mapathonsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MAPATHONS:
      return { ...state, mapathons: [...state.mapathons, ...action.mapathons] }

    case CLEAR_STATE:
      return initialState

    case SET_LOADING_MAPATHONS:
      return { ...state, loadingMapathons: action.loadingMapathons }

    case SET_MAPATHONS:
      return { ...state, mapathons: action.mapathons }

    case SET_NEXT_PAGE:
      return { ...state, nextPage: action.nextPage }

    default:
      return state
  }
}
