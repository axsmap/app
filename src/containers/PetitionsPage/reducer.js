import {
  ADD_PETITIONS,
  CHANGE_FILTER,
  CLEAR_STATE,
  SET_LOADING_PETITIONS,
  SET_NEXT_PAGE,
  SET_NOTIFICATION_MESSAGE,
  SET_PETITIONS
} from './constants'

const initialState = {
  filter: 'received',
  loadingPetitions: true,
  nextPage: null,
  notificationMessage: '',
  petitions: []
}

export default function petitionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PETITIONS:
      return { ...state, petitions: [...state.petitions, ...action.petitions] }

    case CHANGE_FILTER:
      return { ...state, filter: action.filter }

    case CLEAR_STATE:
      return initialState

    case SET_LOADING_PETITIONS:
      return { ...state, loadingPetitions: action.loadingPetitions }

    case SET_NEXT_PAGE:
      return { ...state, nextPage: action.nextPage }

    case SET_NOTIFICATION_MESSAGE:
      return { ...state, notificationMessage: action.notificationMessage }

    case SET_PETITIONS:
      return { ...state, petitions: action.petitions }

    default:
      return state
  }
}
