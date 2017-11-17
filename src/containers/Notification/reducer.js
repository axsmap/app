import { SET_CATEGORY, SET_VISIBILITY } from './constants'

const initialState = {
  category: 'info',
  visibility: false
}

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return { ...state, category: action.category }

    case SET_VISIBILITY:
      return { ...state, visibility: action.visibility }

    default:
      return state
  }
}
