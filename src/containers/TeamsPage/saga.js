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
import { getTeamsEndpoint } from '../../api/teams'

import { addTeams, setNextPage, setLoadingTeams, setTeams } from './actions'
import { GET_TEAMS } from './constants'
import makeSelectTeams from './selector'

function* getTeamsFlow() {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  const keywords = yield select(makeSelectTopBar('keywords'))
  const nextPage = yield select(makeSelectTeams('nextPage'))
  const getTeamsParams = {
    keywords,
    page: nextPage
  }

  let response
  try {
    response = yield call(getTeamsEndpoint, getTeamsParams)
  } catch (error) {
    yield put(setNotificationType('error'))

    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.Teams.timeoutError'))
    } else {
      yield put(setNotificationMessage('axsmap.components.Teams.serverError'))
    }

    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    yield put(setTeams([]))
    yield put(setLoadingTeams(false))
    yield put(setNextPage(null))

    return
  }

  if (response.data.results.length === 0) {
    yield put(setTeams([]))
    yield put(setNextPage(null))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingTeams(false))
    return
  }

  const page = response.data.page
  const lastPage = response.data.lastPage
  const teams = response.data.results

  if (page < lastPage) {
    yield put(setNextPage(page + 1))
  } else {
    yield put(setNextPage(null))
  }

  if (page === 1) {
    yield put(setTeams(teams))
  } else {
    yield put(addTeams(teams))
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setLoadingTeams(false))
}

export default function* teamsSaga() {
  yield takeLatest(GET_TEAMS, getTeamsFlow)
}
