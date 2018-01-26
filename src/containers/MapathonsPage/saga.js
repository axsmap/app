import { call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import makeSelectApp from '../App/selector'
import {
  setType as setNotificationType,
  setIsVisible as setNotificationIsVisible
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import makeSelectTopBar from '../TopBar/selector'
import { getMapathonsEndpoint } from '../../api/mapathons'

import {
  addMapathons,
  setNextPage,
  setLoadingMapathons,
  setMapathons,
  setNotificationMessage
} from './actions'
import { GET_MAPATHONS } from './constants'
import makeSelectMapathons from './selector'

function* getMapathonsFlow() {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  const keywords = yield select(makeSelectTopBar('keywords'))
  const nextPage = yield select(makeSelectMapathons('nextPage'))
  const getMapathonsParams = {
    keywords,
    page: nextPage
  }

  let response
  try {
    response = yield call(getMapathonsEndpoint, getMapathonsParams)
  } catch (error) {
    yield put(setNotificationType('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(setMapathons([]))
    yield put(setNextPage(null))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingMapathons(false))

    return
  }

  if (response.data.results.length === 0) {
    yield put(setMapathons([]))
    yield put(setNextPage(null))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingMapathons(false))
    return
  }

  const page = response.data.page
  const lastPage = response.data.lastPage
  const Mapathons = response.data.results

  if (page < lastPage) {
    yield put(setNextPage(page + 1))
  } else {
    yield put(setNextPage(null))
  }

  if (page === 1) {
    yield put(setMapathons(Mapathons))
  } else {
    yield put(addMapathons(Mapathons))
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingMapathons(false))
}

export default function* mapathonsSaga() {
  yield takeLatest(GET_MAPATHONS, getMapathonsFlow)
}
