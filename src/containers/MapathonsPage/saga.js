import { last } from 'lodash'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import makeSelectApp from '../App/selector'
import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage,
  setType as setNotificationType
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import makeSelectTopBar from '../TopBar/selector'
import { getMapathonsEndpoint } from '../../api/mapathons'

import {
  addMapathons,
  setNextPage,
  setLoadingMapathons,
  setMapathons
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
      yield put(
        setNotificationMessage('axsmap.components.Mapathons.timeoutError')
      )
    } else {
      yield put(
        setNotificationMessage('axsmap.components.Mapathons.serverError')
      )
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
  let newMapathons = response.data.results

  if (page < lastPage) {
    yield put(setNextPage(page + 1))
  } else {
    yield put(setNextPage(null))
  }

  if (page === 1) {
    yield put(setMapathons(newMapathons))
  } else {
    const mapathons = yield select(makeSelectMapathons('mapathons'))
    newMapathons = newMapathons.filter(m => last(mapathons).id !== m.id)
    yield put(addMapathons(newMapathons))
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setLoadingMapathons(false))
}

export default function* mapathonsSaga() {
  yield takeLatest(GET_MAPATHONS, getMapathonsFlow)
}
