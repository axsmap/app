import {
  ADD_MAPATHONS,
  CLEAR_STATE,
  GET_MAPATHONS,
  SET_LOADING_MAPATHONS,
  SET_MAPATHONS,
  SET_NEXT_PAGE,
  GET_HIGHLIGHTED_EVENTS,
  SET_HIGHLIGHTED_EVENTS,
  SET_LOADING_MAPATHONS_MAP
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

export function setLoadingMapathons(loadingMapathons) {
  return { type: SET_LOADING_MAPATHONS, loadingMapathons }
}

export function setMapathons(mapathons) {
  return { type: SET_MAPATHONS, mapathons }
}

export function setNextPage(nextPage) {
  return { type: SET_NEXT_PAGE, nextPage }
}

export function getHighlightedEvents() {
  return { type: GET_HIGHLIGHTED_EVENTS }
}

export function setHighlightedEvents(highlightedEvents) {
  return { type: SET_HIGHLIGHTED_EVENTS, highlightedEvents }
}

export function setLoadingMapathonsMap(loadingMapathonsMap) {
  return { type: SET_LOADING_MAPATHONS_MAP, loadingMapathonsMap }
}
