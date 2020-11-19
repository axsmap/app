import {
  CLEAR_STATE,
  GET_VENUE,
  SET_LOADING_VENUE,
  SET_VENUE,
  SET_USER_REVIEW_FIEDLS_AMOUNT,
  SET_USER_REVIEWS_AMOUNT
} from './constants'

export function clearState() {
  return { type: CLEAR_STATE }
}

export function getVenue(placeId) {
  return { type: GET_VENUE, placeId }
}

export function setLoadingVenue(loadingVenue) {
  return { type: SET_LOADING_VENUE, loadingVenue }
}

export function setVenue(venue) {
  return { type: SET_VENUE, venue }
}

export function setUserReviewFieldsAmount(userReviewFieldsAmount) {
	return { type: SET_USER_REVIEW_FIEDLS_AMOUNT, userReviewFieldsAmount}
}
export function setUserReviewsAmount(userReviewsAmount){
	return { type: SET_USER_REVIEWS_AMOUNT, userReviewsAmount }
}
