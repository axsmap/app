import { SET_NOTIFICATION_MESSAGE, SET_TEAM } from './constants'

const initialState = {
  notificationMessage: '',
  team: {}
}

export default function teamReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATION_MESSAGE:
      return { ...state, notificationMessage: action.notificationMessage }

    case SET_TEAM:
      return { ...state, team: action.team }

    default:
      return state
  }
}
