import {
  CLEAR_FILTERS,
  SET_FILTERS,
  SET_LIST_VISIBILITY,
  SET_POPUP_VISIBILITY,
  ADD_MAPATHONS,
  CLEAR_STATE,
  GET_MAPATHONS,
  SET_LOADING_MAPATHONS,
  SET_MAPATHONS,
  SET_NEXT_PAGE
} from './constants'

export function addMapathons(mapathons) {
  return { type: ADD_MAPATHONS, mapathons }
}

export function clearState() {
  return { type: CLEAR_STATE }
}

export function getMapathons() {
  return { type: GET_MAPATHONS }
}

export function setFilters(key, value) {
  return { type: SET_FILTERS, key, value }
}

export function setListVisibility(listVisibility) {
  return { type: SET_LIST_VISIBILITY, listVisibility }
}

export function clearFilters() {
  return { type: CLEAR_FILTERS }
}

export function setPopupVisibility(popupVisibility) {
  return { type: SET_POPUP_VISIBILITY, popupVisibility }
}

export function setLoadingMapathons(loadingMapathons) {
  return { type: SET_LOADING_MAPATHONS, loadingMapathons }
}

export function setMapathons(mapathons) {
  return { type: SET_MAPATHONS, mapathons }
}

export function setNextPage(nextPage) {
  return { type: SET_NEXT_PAGE, nextPage }
}
