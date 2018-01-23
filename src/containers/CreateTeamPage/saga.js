import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setType as setNotificationType,
  setIsVisible as setNotificationIsVisible
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import makeSelectApp from '../App/selector'
import { createTeamEndpoint } from '../../api/teams'

import { setErrors, setNotificationMessage } from './actions'
import { CREATE_TEAM } from './constants'

function* createTeamFlow({ data, redirectTo }) {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  const teamData = {
    avatar: data.avatar,
    description: data.description,
    name: data.name
  }

  try {
    yield call(createTeamEndpoint, teamData)
  } catch (err) {
    yield put(setNotificationType('error'))
    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
      yield put(setNotificationIsVisible(true))
      return
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('serverError'))
      yield put(setNotificationIsVisible(true))
      return
    } else if (err.response.status === 401) {
      return
    } else if (err.response.status === 423) {
      yield put(setNotificationMessage('blockedError'))
      yield put(setNotificationIsVisible(true))
      return
    }

    const errors = err.response.data
    yield all(Object.keys(errors).map(key => put(setErrors(key, errors[key]))))

    yield put(setSendingRequest(false))
    yield put(finishProgress())

    return
  }

  yield put(setSendingRequest(false))
  yield put(finishProgress())
  redirectTo('/teams')
}

export default function* createTeamSaga() {
  yield takeLatest(CREATE_TEAM, createTeamFlow)
}
