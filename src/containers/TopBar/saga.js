import { call, put, select, takeLatest } from 'redux-saga/effects'

import { finishProgress, startProgress } from '../ProgressBar/actions'
import makeSelectApp from '../App/selector'
import { setSendingRequest } from '../App/actions'
import { signOutEndpoint } from '../../api/authentication'

import { SIGN_OUT_REQUEST } from './constants'

function* signOutFlow() {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  try {
    yield call(signOutEndpoint)
  } finally {
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('token')

    yield put(setSendingRequest(false))
    yield put(finishProgress())

    window.location.reload()
  }
}

export default function* watchSignOut() {
  yield takeLatest(SIGN_OUT_REQUEST, signOutFlow)
}
