import { SET_ADDRESS, SET_KEYWORDS, SET_SHOW_DROPDOWN, SET_NAME } from './constants'

const initialState = {
  keywords: '',
  address: '',
  name: "",
  showDropdown: false
}

export default function topBarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ADDRESS:
      return { ...state, address: action.address }
    
      case SET_NAME:
        return { ...state, name: action.name }

    case SET_KEYWORDS:
      return { ...state, keywords: action.keywords }

    case SET_SHOW_DROPDOWN:
      return { ...state, showDropdown: action.showDropdown }

    default:
      return state
  }
}
