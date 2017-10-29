import {
  CLEAR_QUERY,
  SET_CURRENT_URL,
  SET_QUERY,
  SET_SHOW_DROPDOWN,
  TOGGLE_SHOW_DROPDOWN
} from './constants'

const initialState = {
  query: {
    keyword: '',
    type: 'establishment'
  },
  currentUrl: '/',
  showDropdown: false
}

export default function topBarReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_QUERY:
      return { ...state, query: initialState.query }

    case SET_CURRENT_URL:
      return { ...state, currentUrl: action.currentUrl }

    case SET_QUERY:
      return { ...state, query: { ...state.query, [action.key]: action.value } }

    case SET_SHOW_DROPDOWN:
      return { ...state, showDropdown: action.showDropdown }

    case TOGGLE_SHOW_DROPDOWN:
      return { ...state, showDropdown: !state.showDropdown }

    default:
      return state
  }
}