import { call, put, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage,
  setType as setNotificationType
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { getVenueEndpoint } from '../../api/venues'

import { setLoadingVenue, setVenue } from './actions'
import { GET_VENUE } from './constants'

function* getVenueFlow(params) {
  yield put(startProgress())

  let response
  try {
    response = yield call(getVenueEndpoint, params.placeId)
  } catch (error) {
    yield put(setNotificationType('error'))

    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.Venue.timeoutError'))
    } else if (error.response.data.general === 'Place not found') {
      yield put(setNotificationMessage('axsmap.components.Venue.notFoundError'))
    } else {
      yield put(setNotificationMessage('axsmap.components.Venue.serverError'))
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

export default function* venueSaga() {
  yield takeLatest(GET_VENUE, getVenueFlow)
}
