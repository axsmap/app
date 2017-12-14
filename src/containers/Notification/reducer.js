import { SET_IS_VISIBLE, SET_TYPE } from './constants'

const initialState = {
  isVisible: false,
  type: 'info'
}

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_VISIBLE:
      return { ...state, isVisible: action.isVisible }

    case SET_TYPE:
      return { ...state, type: action.notificationType }

    default:
      return state
  }
}
