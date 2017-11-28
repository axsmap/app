import { SET_CURRENT_URL, SET_KEYWORDS, SET_SHOW_DROPDOWN } from './constants'

const initialState = {
  keywords: '',
  currentUrl: '/',
  showDropdown: false
}

export default function topBarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_URL:
      return { ...state, currentUrl: action.currentUrl }

    case SET_KEYWORDS:
      return { ...state, keywords: action.keywords }

    case SET_SHOW_DROPDOWN:
      return { ...state, showDropdown: action.showDropdown }

    default:
      return state
  }
}
