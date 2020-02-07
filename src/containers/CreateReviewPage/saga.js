import { last } from 'lodash'
import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage,
  setType as setNotificationType
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { createPhotoEndpoint, deletePhotoEndpoint } from '../../api/photos'
import { createReviewEndpoint } from '../../api/reviews'
import appSelector from '../App/selector'
import { getVenueEndpoint } from '../../api/venues'

import {
  clearErrors,
  setErrors,
  setLoadingVenue,
  setPhoto,
  setVenue
} from './actions'
import {
  CREATE_PHOTO,
  CREATE_REVIEW,
  DELETE_PHOTO,
  GET_VENUE
} from './constants'
import venueSelector from './selector'

function* getVenueFlow(params) {
  yield put(startProgress())

  let response
  try {
    response = yield call(getVenueEndpoint, params.placeId)
  } catch (error) {
    yield put(setNotificationType('error'))

    if (error.code === 'ECONNABORTED') {
      yield put(
        setNotificationMessage('axsmap.components.CreateReview.timeoutError')
      )
    } else if (error.response.data.general === 'Place not found') {
      yield put(
        setNotificationMessage('axsmap.components.CreateReview.notFoundError')
      )
    } else {
      yield put(
        setNotificationMessage('axsmap.components.CreateReview.serverError')
      )
    }

    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    yield put(setLoadingVenue(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setVenue(response.data))
  yield put(setLoadingVenue(false))
}

function* createPhotoFlow({ data }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  let response
  try {
    response = yield call(createPhotoEndpoint, data)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(
        setNotificationMessage('axsmap.components.CreateReview.timeoutError')
      )
    } else if (err.response.status === 500) {
      yield put(
        setNotificationMessage('axsmap.components.CreateReview.serverError')
      )
    }

    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setPhoto(response.data.url))
}

function* deletePhotoFlow() {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  const photo = yield select(venueSelector('photo'))
  const photoFileName = last(photo.split('/'))

  try {
    yield call(deletePhotoEndpoint, photoFileName)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(
        setNotificationMessage('axsmap.components.CreateReview.timeoutError')
      )
    } else if (err.response.status === 500) {
      yield put(
        setNotificationMessage('axsmap.components.CreateReview.serverError')
      )
    }

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setPhoto(''))
}

function* createReviewFlow({ data, redirectTo }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))
  yield put(clearErrors())

  const venue = yield select(venueSelector('venue'))
  const photo = yield select(venueSelector('photo'))
  const reviewData = {
    allowsGuideDog:
      data.allowsGuideDog !== null ? data.allowsGuideDog : undefined,
    bathroomScore: data.bathroomScore !== null ? data.bathroomScore : undefined,
    interiorScore: data.interiorScore !== null ? data.interiorScore : undefined,
    comments: data.comments,
    entryScore: data.entryScore !== null ? data.entryScore : undefined,
    event: data.selectedEvent !== 'none' ? data.selectedEvent : undefined,
    hasParking: data.hasParking !== null ? data.hasParking : undefined,
    hasSecondEntry:
      data.hasSecondEntry !== null ? data.hasSecondEntry : undefined,
    hasWellLit: data.hasWellLit !== null ? data.hasWellLit : undefined,
    isQuiet: data.isQuiet !== null ? data.isQuiet : undefined,
    isSpacious: data.isSpacious !== null ? data.isSpacious : undefined,
    photo,
    place: venue.placeId !== null ? venue.placeId : undefined,
    steps: data.steps !== null ? data.steps : undefined,
    team: data.selectedTeam !== 'none' ? data.selectedTeam : undefined,
    hasPermanentRamp:
      data.hasPermanentRamp !== null ? data.hasPermanentRamp : undefined,
    hasPortableRamp:
      data.hasPortableRamp !== null ? data.hasPortableRamp : undefined,
    has0Steps: data.has0Steps !== null ? data.has0Steps : undefined,
    has1Step: data.has1Step !== null ? data.has1Step : undefined,
    has2Steps: data.has2Steps !== null ? data.has2Steps : undefined,
    has3Steps: data.has3Steps !== null ? data.has3Steps : undefined,
    hasWideEntrance:
      data.hasWideEntrance !== null ? data.hasWideEntrance : undefined,
    hasAccessibleTableHeight:
      data.hasAccessibleTableHeight !== null
        ? data.hasAccessibleTableHeight
        : undefined,
    hasAccessibleElevator:
      data.hasAccessibleElevator !== null
        ? data.hasAccessibleElevator
        : undefined,
    hasInteriorRamp:
      data.hasInteriorRamp !== null ? data.hasInteriorRamp : undefined,
    hasSwingOutDoor:
      data.hasSwingOutDoor !== null ? data.hasSwingOutDoor : undefined,
    hasLargeStall: data.hasLargeStall !== null ? data.hasLargeStall : undefined,
    hasSupportAroundToilet:
      data.hasSupportAroundToilet !== null
        ? data.hasSupportAroundToilet
        : undefined,
    hasLoweredSinks:
      data.hasLoweredSinks !== null ? data.hasLoweredSinks : undefined
  }

  try {
    yield call(createReviewEndpoint, reviewData)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      // yield put(
      //   setNotificationMessage("axsmap.components.CreateReview.timeoutError")
      // );
      redirectTo(`/venues/${venue.placeId}`)
    } else if (err.response.data.entryScore === 'Is required') {
      // yield put(
      //   setNotificationMessage("axsmap.components.CreateReview.entryScoreError")
      // );
      redirectTo(`/venues/${venue.placeId}`)
    } else if (err.response.data.general === 'You already rated this venue') {
      yield put(
        setNotificationMessage(
          'axsmap.components.CreateReview.alreadyRatedError'
        )
      )
    } else if (err.response.status === 400) {
      // yield put(
      //   setNotificationMessage('axsmap.components.CreateReview.inputError')
      // )
      redirectTo(`/venues/${venue.placeId}`)
    } else {
      // yield put(
      //   setNotificationMessage("axsmap.components.CreateReview.serverError")
      // );
      redirectTo(`/venues/${venue.placeId}`)
    }

    yield put(setNotificationIsVisible(true))

    const errors = err.response.data
    if (errors) {
      yield all(
        Object.keys(errors).map(key => put(setErrors(key, errors[key])))
      )
    }

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setNotificationType('success'))
  yield put(
    setNotificationMessage(
      'axsmap.components.CreateReview.createdReviewSuccess'
    )
  )
  yield put(setNotificationIsVisible(true))

  redirectTo(`/venues/${venue.placeId}`)
}

export default function* createReviewSaga() {
  yield takeLatest(GET_VENUE, getVenueFlow)
  yield takeLatest(CREATE_PHOTO, createPhotoFlow)
  yield takeLatest(DELETE_PHOTO, deletePhotoFlow)
  yield takeLatest(CREATE_REVIEW, createReviewFlow)
}
