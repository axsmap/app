import {
  ADD_PETITIONS,
  CHANGE_FILTER,
  CHANGE_PETITION_STATE,
  CLEAR_STATE,
  REMOVE_PETITION,
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

    case CHANGE_PETITION_STATE:
      return {
        ...state,
        petitions: state.petitions.map(petition => {
          if (petition.id === action.id)
            return { ...petition, state: action.state }

          return petition
        })
      }

    case CLEAR_STATE:
      return initialState

    case REMOVE_PETITION:
      return {
        ...state,
        petitions: state.petitions.filter(petition => petition.id !== action.id)
      }

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
