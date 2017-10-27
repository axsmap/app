import { call, put, select, takeLatest } from 'redux-saga/effects'

import { finishProgress, startProgress } from '../ProgressBar/actions'
import { signUpEndpoint } from '../../api/authentication'

import { SIGN_UP_REQUEST } from './constants'

import {
  clearMessages,
  requestError,
  requestSuccess,
  sendingRequest
} from './actions'

import makeSelectSignUp from './selector'

function* signUp() {
  const currentlySending = yield select(makeSelectSignUp('currentlySending'))
  if (currentlySending) {
    return
  }

  const data = yield select(makeSelectSignUp('data'))
  const { email, firstName, isSubscribed, lastName, password } = data

  yield put(clearMessages())
  yield put(sendingRequest(true))
  yield put(startProgress())

  try {
    yield call(
      signUpEndpoint,
      email,
      firstName,
      isSubscribed,
      lastName,
      password
    )
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

export default function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}
