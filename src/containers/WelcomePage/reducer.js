import { SET_WELCOME_ADDRESS } from './constants'

const initialState = {
  address: ''
}

export default function welcomePageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WELCOME_ADDRESS:
      return { ...state, address: action.address }

    default:
      return state
  }
}
