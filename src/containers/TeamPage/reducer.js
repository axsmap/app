import {
  CLEAR_STATE,
  SET_EDIT_IS_VISIBLE,
  SET_ERRORS,
  SET_LOADING_USERS,
  SET_NOTIFICATION_MESSAGE,
  SET_PETITION_SENT,
  SET_TEAM,
  SET_USERS
} from './constants'

const initialState = {
  notificationMessage: '',
  team: {
    id: '',
    avatar: '',
    name: '',
    description: '',
    ranking: 0,
    reviewsAmount: 0,
    events: [
      {
        id: '',
        endDate: '',
        name: '',
        poster: '',
        startDate: ''
      }
    ],
    managers: [
      {
        id: '',
        avatar: '',
        firstName: '',
        lastName: '',
        username: ''
      }
    ],
    members: [
      {
        id: '',
        avatar: '',
        firstName: '',
        lastName: '',
        username: ''
      }
    ]
  },
  editIsVisible: false,
  errors: {
    name: '',
    description: '',
    managers: '',
    members: ''
  },
  loadingUsers: false,
  users: [],
  petitionSent: false
}

export default function teamReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState

    case SET_EDIT_IS_VISIBLE:
      return { ...state, editIsVisible: action.editIsVisible }

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    case SET_LOADING_USERS:
      return { ...state, loadingUsers: action.loadingUsers }

    case SET_NOTIFICATION_MESSAGE:
      return { ...state, notificationMessage: action.notificationMessage }

    case SET_PETITION_SENT:
      return { ...state, petitionSent: action.petitionSent }

    case SET_TEAM:
      return { ...state, team: action.team }

    case SET_USERS:
      return { ...state, users: action.users }

    default:
      return state
  }
}
