import { FINISH_PROGRESS, START_PROGRESS, SET_PERCENT } from './constants'

export function finishProgress() {
  return { type: FINISH_PROGRESS }
}

export function startProgress() {
  return { type: START_PROGRESS }
}

export function setPercent(percent) {
  return { type: SET_PERCENT, percent }
}
