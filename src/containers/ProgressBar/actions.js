import { CLEAN_PROGRESS, FINISH_PROGRESS, START_PROGRESS } from './constants'

export function cleanProgress() {
  return { type: CLEAN_PROGRESS }
}

export function finishProgress() {
  return { type: FINISH_PROGRESS }
}

export function startProgress() {
  return { type: START_PROGRESS }
}
