import {
  CLEAR_ERRORS,
  CLEAR_STATE,
  CREATE_AVATAR,
  CREATE_TEAM,
  DELETE_AVATAR,
  SET_AVATAR,
  SET_ERRORS
} from './constants'

export function clearErrors() {
  return { type: CLEAR_ERRORS }
}

export function clearState() {
  return { type: CLEAR_STATE }
}

export function createAvatar(data) {
  return { type: CREATE_AVATAR, data }
}

export function deleteAvatar() {
  return { type: DELETE_AVATAR }
}

export function createTeam(data, redirectTo) {
  return { type: CREATE_TEAM, data, redirectTo }
}

export function setAvatar(avatar) {
  return { type: SET_AVATAR, avatar }
}

export function setErrors(key, value) {
  return { type: SET_ERRORS, key, value }
}
