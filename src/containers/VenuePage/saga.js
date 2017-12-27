import { call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setType as setNotificationType,
  setIsVisible as setNotificationIsVisible
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { createReviewEndpoint } from '../../api/reviews'
import makeSelectApp from '../App/selector'
import { getVenueEndpoint } from '../../api/venues'

import {
  setCreateReviewVisible,
  setLoadingVenue,
  setNotificationMessage,
  setVenue
} from './actions'
import { CREATE_REVIEW, GET_VENUE } from './constants'
import makeSelectVenue from './selector'

function* getVenueFlow(params) {
  yield put(startProgress())

  let response
  try {
    response = yield call(getVenueEndpoint, params.placeId)
  } catch (error) {
    yield put(setNotificationType('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else if (error.response.data.general === 'Place not found') {
      yield put(setNotificationMessage('notFoundError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(setLoadingVenue(false))
    yield put(finishProgress())

    return
  }

  yield put(setVenue(response.data))
  yield put(setLoadingVenue(false))
  yield put(finishProgress())
}

function* createReviewFlow({ data }) {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  const venue = yield select(makeSelectVenue('venue'))
  const reviewData = {
    allowsGuideDog:
      data.allowsGuideDog !== null ? data.allowsGuideDog : undefined,
    bathroomScore: data.bathroomScore !== null ? data.bathroomScore : undefined,
    comments: data.comments,
    entryScore: data.entryScore !== null ? data.entryScore : undefined,
    event: data.event !== null ? data.event : undefined,
    hasParking: data.hasParking !== null ? data.hasParking : undefined,
    hasSecondEntry:
      data.hasSecondEntry !== null ? data.hasSecondEntry : undefined,
    hasWellLit: data.hasWellLit !== null ? data.hasWellLit : undefined,
    isQuiet: data.isQuiet !== null ? data.isQuiet : undefined,
    isSpacious: data.isSpacious !== null ? data.isSpacious : undefined,
    photo: data.photo,
    place: venue.placeId !== null ? venue.placeId : undefined,
    steps: data.steps !== null ? data.steps : undefined,
    team: data.team !== null ? data.team : undefined
  }

  try {
    yield call(createReviewEndpoint, reviewData)
  } catch (err) {
    yield put(setNotificationType('error'))
    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else if (err.response.data.entryScore === 'Is required') {
      yield put(setNotificationMessage('entryScoreError'))
    } else if (err.response.data.general === 'You already rated this venue') {
      yield put(setNotificationMessage('alreadyRatedError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(setSendingRequest(false))
    yield put(finishProgress())

    return
  }

  yield put(setNotificationType('success'))
  yield put(setNotificationMessage('createdReviewSuccess'))
  yield put(setNotificationIsVisible(true))
  yield put(setSendingRequest(false))
  yield put(finishProgress())

  yield put(setCreateReviewVisible(false))
  yield call(getVenueFlow, {
    placeId: venue.placeId
  })
}

export default function* venueSaga() {
  yield takeLatest(GET_VENUE, getVenueFlow)
  yield takeLatest(CREATE_REVIEW, createReviewFlow)
}
