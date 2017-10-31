import { FINISH_PROGRESS, START_PROGRESS, SET_PERCENT } from './constants'

const initialState = {
  percent: -1
}

export default function progressBarReducer(state = initialState, action) {
  switch (action.type) {
    case FINISH_PROGRESS:
      return { percent: 100 }

    case START_PROGRESS:
      return { percent: 0 }

    case SET_PERCENT:
      return { percent: action.percent }

    default:
      return state
  }
}
