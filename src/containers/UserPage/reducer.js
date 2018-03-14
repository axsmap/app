import {
  CLEAR_ERRORS,
  CLEAR_STATE,
  SET_AVATAR,
  SET_EDIT_IS_VISIBLE,
  SET_ERRORS,
  SET_LOADING_USER,
  SET_USER,
  CLEAR_PETITIONS_STATE,
  ADD_PETITIONS,
  CHANGE_FILTER,
  CHANGE_PETITION_STATE,
  REMOVE_PETITION,
  SET_LOADING_PETITIONS,
  SET_NEXT_PAGE,
  SET_PETITIONS
} from './constants'

const initialState = {
  loadingUser: true,
  user: {},
  avatar: '',
  editIsVisible: false,
  errors: {
    avatar: '',
    description: '',
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    zip: ''
  },
  filter: 'received',
  loadingPetitions: true,
  nextPage: null,
  petitions: []
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return { ...state, errors: initialState.errors }

    case CLEAR_STATE:
      return initialState

    case SET_AVATAR:
      return { ...state, avatar: action.avatar }

    case SET_EDIT_IS_VISIBLE:
      return { ...state, editIsVisible: action.editIsVisible }

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    case SET_LOADING_USER:
      return { ...state, loadingUser: action.loadingUser }

    case SET_USER:
      return { ...state, user: action.user }

    case CLEAR_PETITIONS_STATE:
      return {
        ...state,
        filter: 'received',
        loadingPetitions: true,
        nextPage: null,
        petitions: []
      }

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

    case REMOVE_PETITION:
      return {
        ...state,
        petitions: state.petitions.filter(petition => petition.id !== action.id)
      }

    case SET_LOADING_PETITIONS:
      return { ...state, loadingPetitions: action.loadingPetitions }

    case SET_NEXT_PAGE:
      return { ...state, nextPage: action.nextPage }

    case SET_PETITIONS:
      return { ...state, petitions: action.petitions }

    default:
      return state
  }
}
