import { SET_WELCOME_ADDRESS, SET_WELCOME_NAME} from './constants'

const initialState = {
  address: '',
  name: ''
}

export default function welcomePageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WELCOME_ADDRESS:
      return { ...state, address: action.address }

      case SET_WELCOME_NAME:
        return { ...state, name: action.name }

    default:
      return state
  }
}
