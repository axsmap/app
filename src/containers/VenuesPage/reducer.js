import {
  ADD_VENUES,
  ADD_VISIBLE_VENUES,
  SET_LOADING_MAP,
  SET_LOCATION,
  SET_NEXT_PAGE,
  SET_VENUES,
  SET_VISIBLE_VENUES
} from './constants'

const initialState = {
  keywords: '',
  loadingMap: true,
  location: { lat: 0, lng: 0 },
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

    case SET_LOADING_MAP:
      return { ...state, loadingMap: action.loadingMap }

    case SET_LOCATION:
      return { ...state, location: action.location }

    case SET_NEXT_PAGE:
      return { ...state, nextPage: action.nextPage }

    case SET_VENUES:
      return { ...state, venues: action.venues }

    case SET_VISIBLE_VENUES:
      return { ...state, visibleVenues: action.visibleVenues }

    default:
      return state
  }
}
