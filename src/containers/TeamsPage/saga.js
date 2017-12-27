import { call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import makeSelectApp from '../App/selector'
import {
  setType as setNotificationType,
  setIsVisible as setNotificationIsVisible
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import makeSelectTopBar from '../TopBar/selector'
import { getTeamsEndpoint } from '../../api/teams'

import {
  addTeams,
  clearState,
  setNextPage,
  setLoadingTeams,
  setNotificationMessage,
  setTeams
} from './actions'
import { GET_TEAMS } from './constants'
import makeSelectTeams from './selector'

function* handleResponse(getTeamsParams) {
  let response
  try {
    response = yield call(getTeamsEndpoint, getTeamsParams)
  } catch (error) {
    yield put(clearState())
    yield put(setNotificationType('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(setSendingRequest(false))
    yield put(finishProgress())
  }

  return response
}

function* getTeamsFlow() {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  const nextPage = yield select(makeSelectTeams('nextPage'))

  const keywords = yield select(makeSelectTopBar('keywords'))

  const getTeamsParams = {
    keywords,
    page: nextPage
  }

  const response = yield handleResponse(getTeamsParams)
  if (!response) {
    yield put(setLoadingTeams(false))
    return
  }

  if (nextPage) {
    yield put(addTeams(response.data.results))
  } else {
    yield put(setTeams(response.data.results))
  }

  if (response.data.nextPage) {
    yield put(setNextPage(response.data.nextPage))
  } else {
    yield put(setNextPage(''))
  }
  yield put(setLoadingTeams(false))
  yield put(setSendingRequest(false))
  yield put(finishProgress())
}

export default function* teamsSaga() {
  yield takeLatest(GET_TEAMS, getTeamsFlow)
}
