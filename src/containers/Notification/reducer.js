import { SET_IS_VISIBLE, SET_MESSAGE, SET_TYPE } from './constants'

const initialState = {
  isVisible: false,
  type: 'info',
  message: ''
}

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_VISIBLE:
      return { ...state, isVisible: action.isVisible }

    case SET_MESSAGE:
      return { ...state, message: action.message }

    case SET_TYPE:
      return { ...state, type: action.notificationType }

    default:
      return state
  }
}
