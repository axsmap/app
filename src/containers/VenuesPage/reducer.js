import {
  ADD_VENUES,
  ADD_VISIBLE_VENUES,
  CLEAR_FILTERS,
  CLEAR_STATE,
  SET_CENTER_LOCATION,
  SET_FILTERS,
  SET_INCOMING_VENUES,
  SET_LIST_VISIBILITY,
  SET_LOADING_MAP,
  SET_LOADING_VENUES,
  SET_MAP_VISIBILITY,
  SET_NEXT_PAGE,
  SET_POPUP_VISIBILITY,
  SET_SHOW_SEARCH_HERE,
  SET_SHOW_USER_MARKER,
  SET_USER_LOCATION,
  SET_VENUES,
  SET_VISIBLE_VENUES,
  SET_WELCOME_VISIBILITY,
  SET_USES_VISIBILITY
} from './constants'

const initialState = {
  filters: {
    visible: false,
    type: 'establishment',
    entryScore: 'any',
    interiorScore: 'any',
    bathroomScore: 'any',
    allowsGuideDog: 'any',
    hasParking: 'any'
  },
  listVisibility: false,
  loadingVenues: true,
  incomingVenues: false,
  loadingMap: true,
  mapVisibility: true,
  showSearchHere: false,
  centerLocation: { lat: 0, lng: 0 },
  userLocation: { lat: 0, lng: 0 },
  showUserMarker: false,
  venues: [],
  visibleVenues: [],
  popupVisibility: false,
  nextPage: '',
  welcomeVisibility: true,
  usesVisibility: true,
  address: ''
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

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: initialState.filters
      }

    case CLEAR_STATE:
      return initialState

    case SET_CENTER_LOCATION:
      return { ...state, centerLocation: action.centerLocation }

    case SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value }
      }

    case SET_INCOMING_VENUES:
      return { ...state, incomingVenues: action.incomingVenues }

    case SET_LIST_VISIBILITY:
      return { ...state, listVisibility: action.listVisibility }

    case SET_LOADING_MAP:
      return { ...state, loadingMap: action.loadingMap }

    case SET_LOADING_VENUES:
      return { ...state, loadingVenues: action.loadingVenues }

    case SET_MAP_VISIBILITY:
      return { ...state, mapVisibility: action.mapVisibility }

    case SET_NEXT_PAGE:
      return { ...state, nextPage: action.nextPage }

    case SET_POPUP_VISIBILITY:
      return { ...state, popupVisibility: action.popupVisibility }

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

    case SET_WELCOME_VISIBILITY:
      return { ...state, welcomeVisibility: action.welcomeVisibility }

    case SET_USES_VISIBILITY:
      return { ...state, usesVisibility: action.usesVisibility }

    default:
      return state
  }
}
