import { SET_CATEGORY, SET_VISIBILITY } from './constants'

export function setCategory(category) {
  return { type: SET_CATEGORY, category }
}

export function setVisibility(visibility) {
  return { type: SET_VISIBILITY, visibility }
}
