import {
  CLEAR_ERRORS,
  CLEAR_INVITATIONS_STATE,
  CLEAR_STATE,
  SET_EDIT_IS_VISIBLE,
  SET_ERRORS,
  SET_LOADING_TEAMS,
  SET_LOADING_TEAMS_MANAGERS,
  SET_LOADING_USERS,
  SET_LOADING_MAPATHON,
  SET_LOCATION_COORDINATES,
  SET_MAPATHON,
  SET_POSTER,
  SET_TEAMS,
  SET_TEAMS_MANAGERS,
  SET_USERS
} from './constants'

const initialState = {
  loadingMapathon: true,
  mapathon: {},
  poster: '',
  editIsVisible: false,
  errors: {
    address: '',
    description: '',
    endDate: '',
    managers: '',
    name: '',
    participantsGoal: '',
    reviewsGoal: '',
    startDate: ''
  },
  loadingUsers: false,
  users: [],
  loadingTeamsManagers: false,
  teamsManagers: [],
  loadingTeams: false,
  teams: []
}

export default function mapathonReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return { ...state, errors: initialState.errors }

    case CLEAR_INVITATIONS_STATE:
      return {
        ...state,
        loadingUsers: false,
        users: [],
        loadingTeams: false,
        teams: []
      }

    case CLEAR_STATE:
      return initialState

    case SET_EDIT_IS_VISIBLE:
      return { ...state, editIsVisible: action.editIsVisible }

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    case SET_LOADING_MAPATHON:
      return { ...state, loadingMapathon: action.loadingMapathon }

    case SET_LOADING_TEAMS:
      return { ...state, loadingTeams: action.loadingTeams }

    case SET_LOADING_TEAMS_MANAGERS:
      return { ...state, loadingTeamsManagers: action.loadingTeamsManagers }

    case SET_LOADING_USERS:
      return { ...state, loadingUsers: action.loadingUsers }

    case SET_LOCATION_COORDINATES:
      return {
        ...state,
        mapathon: {
          ...state.mapathon,
          location: {
            ...state.mapathon.location,
            coordinates: [
              action.locationCoordinates.lng,
              action.locationCoordinates.lat
            ]
          }
        }
      }

    case SET_MAPATHON:
      return { ...state, mapathon: action.mapathon }

    case SET_POSTER:
      return { ...state, poster: action.poster }

    case SET_TEAMS:
      return { ...state, teams: action.teams }

    case SET_TEAMS_MANAGERS:
      return { ...state, teamsManagers: action.teamsManagers }

    case SET_USERS:
      return { ...state, users: action.users }

    default:
      return state
  }
}
