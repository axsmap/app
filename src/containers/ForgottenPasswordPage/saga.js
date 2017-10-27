import { call, put, select, takeLatest } from 'redux-saga/effects'

import { finishProgress, startProgress } from '../ProgressBar/actions'
import { forgottenPasswordEndpoint } from '../../api/authentication'

import { FORGOTTEN_PASSWORD_REQUEST } from './constants'
import makeSelect from './selector'

import {
  clearMessages,
  requestError,
  requestSuccess,
  sendingRequest
} from './actions'

function* resetPassword() {
  const currentlySending = yield select(makeSelect('currentlySending'))
  if (currentlySending) {
    return
  }

  const data = yield select(makeSelect('data'))
  const { email } = data

  yield put(clearMessages())
  yield put(sendingRequest(true))
  yield put(startProgress())

  try {
    yield call(forgottenPasswordEndpoint, email)
  } catch (error) {
    yield put(sendingRequest(false))
    yield put(finishProgress())
    yield put(requestError(error.response.data))
    return
  }

  yield put(sendingRequest(false))
  yield put(finishProgress())
  yield put(requestSuccess('Success'))
}

export default function* watchResetPassword() {
  yield takeLatest(FORGOTTEN_PASSWORD_REQUEST, resetPassword)
}
