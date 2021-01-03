import {
  ADD_MAPATHONS,
  CLEAR_STATE,
  SET_LOADING_MAPATHONS,
  SET_MAPATHONS,
  SET_NEXT_PAGE,
  CLEAR_FILTERS,
  SET_FILTERS,
  SET_LIST_VISIBILITY,
  SET_POPUP_VISIBILITY,
} from './constants'

const initialState = {
  loadingMapathons: true,
  mapathons: [],
  filters: {
    numberOfReviews: 0,
    date: 0,
    geolocation: {radius: 0, lat: 0, long: 0},
    hideZeroReviews: 0
  },
  listVisibility: false,
  popupVisibility: false,
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
    
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: initialState.filters
      }
    case SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value }
      }
    case SET_LIST_VISIBILITY:
      return { ...state, listVisibility: action.listVisibility }
    
    case SET_POPUP_VISIBILITY:
      return { ...state, popupVisibility: action.popupVisibility }

    case SET_NEXT_PAGE:
      return { ...state, nextPage: action.nextPage }

    default:
      return state
  }
}
