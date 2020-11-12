import {
  ADD_MAPATHONS,
  CLEAR_STATE,
  SET_FILTERS,
  CLEAR_FILTERS,
  SET_LOADING_MAPATHONS,
  SET_MAPATHONS,
  SET_NEXT_PAGE,
  SET_POPUP_VISIBILITY
} from './constants'

const initialState = {
  filters: {
    visible: false,
    location: 'any',
    date: 'any',
    numOfReviews: 'any',
    numOfParticipants: 'any',
    hideMapathonsWithZeroReviews: false
  },
  loadingMapathons: true,
  mapathons: [],
  nextPage: null,
  popupVisibility: false
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

    case SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value }
      }

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: initialState.filters
      }
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: initialState.filters
      }

    // case SET_INCOMING_VENUES:
    //   return { ...state, incomingVenues: action.incomingVenues }

    case SET_POPUP_VISIBILITY:
      return { ...state, popupVisibility: action.popupVisibility }

    default:
      return state
  }
}
