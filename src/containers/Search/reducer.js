import {
  SET_CURRENTLY_SENDING,
  SET_INPUT,
  SET_LOCATION_ERROR,
  SET_LOCATION,
  SET_SHOW_FILTERS,
  SET_VENUE_TYPE,
  SET_VENUES,
  TOGGLE_SHOW_FILTERS
} from './constants'

const initialState = {
  currentlySending: false,
  input: '',
  location: '',
  locationError: '',
  showFilters: false,
  venueType: 'any',
  venues: []
}

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENTLY_SENDING:
      return { ...state, currentlySending: action.currentlySending }

    case SET_INPUT:
      return { ...state, input: action.input }

    case SET_LOCATION_ERROR:
      return { ...state, locationError: action.locationError }

    case SET_VENUE_TYPE:
      return { ...state, venueType: action.venueType }

    case SET_LOCATION:
      return { ...state, location: action.location }

    case SET_VENUES:
      return { ...state, venues: action.venues }

    case SET_SHOW_FILTERS:
      return { ...state, showFilters: action.showFilters }

    case TOGGLE_SHOW_FILTERS:
      return { ...state, showFilters: !state.showFilters }

    default:
      return state
  }
}
