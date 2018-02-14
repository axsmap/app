import { call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setType as setNotificationType,
  setIsVisible as setNotificationIsVisible
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import makeSelectApp from '../App/selector'
import { getMapathonEndpoint } from '../../api/mapathons'

import {
  setLoadingMapathon,
  setMapathon,
  setNotificationMessage
} from './actions'
import { GET_MAPATHON } from './constants'

function* showNotificationError(message) {
  yield put(setNotificationType('error'))
  yield put(setNotificationMessage(message))
  yield put(setNotificationIsVisible(true))
  yield put(finishProgress())
  yield put(setSendingRequest(false))
}

function* getMapathonFlow(params) {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  let response
  try {
    response = yield call(getMapathonEndpoint, params.mapathonId)
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      yield showNotificationError('timeoutError')
    } else if (error.response.status === 500) {
      yield showNotificationError('serverError')
    } else if (error.response.data.general === 'Event not found') {
      yield showNotificationError('notFoundError')
    }

    yield put(setLoadingMapathon(false))
    return
  }

  yield put(setMapathon(response.data))

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingMapathon(false))
}

export default function* mapathonSaga() {
  yield takeLatest(GET_MAPATHON, getMapathonFlow)
}
