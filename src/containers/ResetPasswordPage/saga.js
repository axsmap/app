import { call, put, select, takeLatest } from 'redux-saga/effects'

import { finishProgress, startProgress } from '../ProgressBar/actions'
import { resetPasswordEndpoint } from '../../api/authentication'

import makeSelect from './selector'
import { RESET_PASSWORD_REQUEST } from './constants'

import {
  clearMessages,
  requestError,
  requestSuccess,
  resetPasswordSuccess,
  sendingRequest
} from './actions'

function* resetPassword(params) {
  const data = yield select(makeSelect('data'))
  const { password } = data

  yield put(clearMessages())
  yield put(sendingRequest(true))
  yield put(startProgress())

  try {
    yield call(resetPasswordEndpoint, params.key, password)
  } catch (error) {
    yield put(sendingRequest(false))
    yield put(finishProgress())
    yield put(requestError(error.response.data))
    return
  }

  yield put(sendingRequest(false))
  yield put(finishProgress())
  yield put(resetPasswordSuccess(true))
  yield put(requestSuccess('Success'))
}

export default function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPassword)
}
