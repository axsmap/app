import {
  ADD_VENUES,
  ADD_VISIBLE_VENUES,
  CLEAR_STATE,
  SET_CENTER_LOCATION,
  SET_LOADING_MAP,
  SET_NEXT_PAGE,
  SET_SHOW_SEARCH_HERE,
  SET_SHOW_USER_MARKER,
  SET_USER_LOCATION,
  SET_VENUES,
  SET_VISIBLE_VENUES
} from './constants'

const initialState = {
  keywords: '',
  loadingMap: true,
  showSearchHere: false,
  centerLocation: { lat: 0, lng: 0 },
  userLocation: { lat: 0, lng: 0 },
  showUserMarker: false,
  venues: [],
  visibleVenues: [],
  nextPage: ''
}

export default function venuesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_VENUES:
      return { ...state, venues: [...state.venues, ...action.venues] }

    case ADD_VISIBLE_VENUES:
      return {
        ...state,
        visibleVenues: [...state.visibleVenues, ...action.visibleVenues]
      }

    case CLEAR_STATE:
      return initialState

    case SET_CENTER_LOCATION:
      return { ...state, centerLocation: action.centerLocation }

    case SET_LOADING_MAP:
      return { ...state, loadingMap: action.loadingMap }

    case SET_NEXT_PAGE:
      return { ...state, nextPage: action.nextPage }

    case SET_SHOW_SEARCH_HERE:
      return { ...state, showSearchHere: action.showSearchHere }

    case SET_SHOW_USER_MARKER:
      return { ...state, showUserMarker: action.showUserMarker }

    case SET_USER_LOCATION:
      return { ...state, userLocation: action.userLocation }

    case SET_VENUES:
      return { ...state, venues: action.venues }

    case SET_VISIBLE_VENUES:
      return { ...state, visibleVenues: action.visibleVenues }

    default:
      return state
  }
}
