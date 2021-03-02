import {
  ADD_MAPATHONS,
  CLEAR_STATE,
  SET_LOADING_MAPATHONS,
  SET_MAPATHONS,
  SET_NEXT_PAGE,
  GET_HIGHLIGHTED_EVENTS,
  SET_HIGHLIGHTED_EVENTS,
  SET_LOADING_MAPATHONS_MAP
} from './constants'

const initialState = {
  loadingMapathons: true,
  mapathons: [],
  nextPage: null,
  highlightedEvents: [],
  loadingMapathonsMap: true
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

    case GET_HIGHLIGHTED_EVENTS:
      return { ...state, highlightedEvents: action.eventsData }

    case SET_HIGHLIGHTED_EVENTS:
      return { ...state, highlightedEvents: action.highlightedEvents }

    case SET_LOADING_MAPATHONS_MAP:
      return { ...state, loadingMapathonsMap: action.loadingMapathonsMap }

    default:
      return state
  }
}
