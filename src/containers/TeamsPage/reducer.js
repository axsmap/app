import {
  ADD_TEAMS,
  CLEAR_STATE,
  SET_LOADING_TEAMS,
  SET_NEXT_PAGE,
  SET_TEAMS
} from './constants'

const initialState = {
  loadingTeams: true,
  nextPage: null,
  teams: []
}

export default function teamsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TEAMS:
      return { ...state, teams: [...state.teams, ...action.teams] }

    case CLEAR_STATE:
      return initialState

    case SET_LOADING_TEAMS:
      return { ...state, loadingTeams: action.loadingTeams }

    case SET_NEXT_PAGE:
      return { ...state, nextPage: action.nextPage }

    case SET_TEAMS:
      return { ...state, teams: action.teams }

    default:
      return state
  }
}
