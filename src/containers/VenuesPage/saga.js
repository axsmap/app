import { call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { getLocationEndpoint } from '../../api/google'
import makeSelectApp from '../App/selector'
import { getVenuesEndpoint } from '../../api/venues'

import {
  addVisibleVenues,
  setLoadingMap,
  setLocation,
  setNextPage,
  setVenues,
  setVisibleVenues
} from './actions'
import { GET_VENUES } from './constants'
import makeSelectVenues from './selector'

function* getVenuesFlow() {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  let location = yield select(makeSelectVenues('location'))
  if (location.lat === 0 && location.lng === 0) {
    try {
      location = yield call(getLocationEndpoint)
    } catch (err) {
      yield put(setVenues([]))
      yield put(setVisibleVenues([]))
      yield put(setNextPage(''))
      yield put(setLoadingMap(false))
      yield put(setSendingRequest(false))
      return
    }

    yield put(setLocation(location))
    yield put(setLoadingMap(false))
  }

  const keywords = yield select(makeSelectVenues('keywords'))

  const getVenuesParams = {
    location: `${location.lat},${location.lng}`,
    keywords
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  let response
  try {
    response = yield call(getVenuesEndpoint, getVenuesParams)
  } catch (error) {
    yield put(setVenues([]))
    yield put(setVisibleVenues([]))
    yield put(setNextPage(''))
    yield put(setLoadingMap(false))
    yield put(setSendingRequest(false))
    yield put(finishProgress())

    return
  }

  yield put(setVenues(response.results))
  if (response.nextPage) {
    yield put(setNextPage(response.nextPage))
  } else {
    yield put(setNextPage(''))
  }

  const venues = yield select(makeSelectVenues('venues'))
  const visibleVenues = yield select(makeSelectVenues('visibleVenues'))
  yield put(
    addVisibleVenues(
      venues.slice(visibleVenues.length, visibleVenues.length + 18)
    )
  )

  yield put(setSendingRequest(false))
  yield put(finishProgress())
}

export default function* watchGetVenues() {
  yield takeLatest(GET_VENUES, getVenuesFlow)
}
