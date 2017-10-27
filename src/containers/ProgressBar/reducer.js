import { CLEAN_PROGRESS, FINISH_PROGRESS, START_PROGRESS } from './constants'

const initialState = {
  percent: -1
}

export default function productListReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAN_PROGRESS:
      return { percent: -1 }

    case FINISH_PROGRESS:
      return { percent: 100 }

    case START_PROGRESS:
      return { percent: 0 }

    default:
      return state
  }
}
