import { SET_SHOW_SEARCH } from './constants'

const initialState = {
  showSearch: false
}

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SHOW_SEARCH:
      return { ...state, showSearch: action.showSearch }

    default:
      return state
  }
}
