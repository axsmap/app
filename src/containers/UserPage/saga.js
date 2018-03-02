import { call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setType as setNotificationType,
  setIsVisible as setNotificationIsVisible
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import appSelector from '../App/selector'
import { getUserEndpoint } from '../../api/users'

import { setLoadingUser, setNotificationMessage, setUser } from './actions'
import { GET_USER } from './constants'

function* showNotificationError(message) {
  yield put(setNotificationType('error'))
  yield put(setNotificationMessage(message))
  yield put(setNotificationIsVisible(true))
  yield put(finishProgress())
  yield put(setSendingRequest(false))
}

function* getUserFlow(params) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  let response
  try {
    response = yield call(getUserEndpoint, params.userId)
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      yield showNotificationError('timeoutError')
    } else if (error.response.status === 500) {
      yield showNotificationError('serverError')
    } else if (error.response.data.general === 'User not found') {
      yield showNotificationError('notFoundError')
    }

    yield put(setLoadingUser(false))
    return
  }

  yield put(setUser(response.data))

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingUser(false))
}

export default function* userSaga() {
  yield takeLatest(GET_USER, getUserFlow)
}
