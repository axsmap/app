import {
  ADD_VENUES,
  ADD_VISIBLE_VENUES,
  SET_CURRENTLY_SENDING,
  SET_INPUT,
  SET_LOADING_VENUES,
  SET_LOCATION_ERROR,
  SET_LOCATION,
  SET_NEXT_PAGE,
  SET_SHOW_FILTERS,
  SET_VENUE_TYPE,
  SET_VENUES,
  SET_VISIBLE_VENUES,
  TOGGLE_SHOW_FILTERS
} from './constants'

const initialState = {
  currentlySending: false,
  input: '',
  loadingVenues: false,
  location: '',
  locationError: '',
  nextPage: '',
  showFilters: false,
  venueType: 'any',
  venues: [],
  visibleVenues: []
}

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_VENUES:
      return { ...state, venues: [...state.venues, ...action.venues] }

    case ADD_VISIBLE_VENUES:
      return {
        ...state,
        visibleVenues: [...state.visibleVenues, ...action.visibleVenues]
      }

    case SET_CURRENTLY_SENDING:
      return { ...state, currentlySending: action.currentlySending }

    case SET_INPUT:
      return { ...state, input: action.input }

    case SET_LOADING_VENUES:
      return { ...state, loadingVenues: action.loadingVenues }

    case SET_LOCATION_ERROR:
      return { ...state, locationError: action.locationError }

    case SET_LOCATION:
      return { ...state, location: action.location }

    case SET_NEXT_PAGE:
      return { ...state, nextPage: action.nextPage }

    case SET_SHOW_FILTERS:
      return { ...state, showFilters: action.showFilters }

    case SET_VENUE_TYPE:
      return { ...state, venueType: action.venueType }

    case SET_VENUES:
      return { ...state, venues: action.venues }

    case SET_VISIBLE_VENUES:
      return { ...state, visibleVenues: action.visibleVenues }

    case TOGGLE_SHOW_FILTERS:
      return { ...state, showFilters: !state.showFilters }

    default:
      return state
  }
}
