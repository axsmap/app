import { call, put, select, takeLatest } from 'redux-saga/effects'

import { signInEndpoint } from '../../api/authentication'

import makeSelect from './selector'

import {
  CLEAR,
  REQUEST_ERROR,
  SENDING_REQUEST,
  SIGN_IN_REQUEST
} from './constants'

function* signIn() {
  const data = yield select(makeSelect('data'))
  const { email, password } = data

  yield put({ type: CLEAR })
  yield put({ type: SENDING_REQUEST, sending: true })

  try {
    yield call(signInEndpoint, email, password)
  } catch (error) {
    yield put({ type: SENDING_REQUEST, sending: false })
    yield put({
      type: REQUEST_ERROR,
      errorMessage: error.response.data.message
    })
    return
  }

  yield put({ type: SENDING_REQUEST, sending: false })
}

export default function* watchSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, signIn)
}
