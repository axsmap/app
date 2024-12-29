import {
  CLEAR_ERRORS,
  CLEAR_STATE,
  SET_ERRORS,
  SET_LOADING_TEAMS,
  SET_LOCATION_COORDINATES,
  SET_POSTER,
  SET_TEAMS
} from './constants'

const initialState = {
  poster: '',
  locationCoordinates: { lat: 40.674905, lng: -73.944657 },
  errors: {
    address: '',
    description: '',
    endDate: '',
    name: '',
    participantsGoal: '',
    reviewsGoal: '',
    startDate: '',
    donationIntroMessage: '',
    donationGoal: '',
    donationThanksMessage: ''
  },
  loadingTeams: false,
  teams: []
}

export default function createMapathonReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return { ...state, errors: initialState.errors }

    case CLEAR_STATE:
      return initialState

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    case SET_LOADING_TEAMS:
      return { ...state, loadingTeams: action.loadingTeams }

    case SET_LOCATION_COORDINATES:
      return { ...state, locationCoordinates: action.locationCoordinates }

    case SET_POSTER:
      return { ...state, poster: action.poster }

    case SET_TEAMS:
      return { ...state, teams: action.teams }

    default:
      return state
  }
}
