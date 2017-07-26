import { call, put, select, takeLatest } from 'redux-saga/effects'

import { signUpEndpoint } from '../../api/authentication'

import { makeSelectData } from './selectors'

import {
  CLEAR,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SENDING_REQUEST,
  SIGN_UP_REQUEST
} from './constants'

function* performSignUp() {
  const data = yield select(makeSelectData())
  const { email, firstName, lastName, password } = data

  yield put({ type: CLEAR })
  yield put({ type: SENDING_REQUEST, sending: true })

  try {
    yield call(signUpEndpoint, email, firstName, lastName, password)
  } catch (error) {
    yield put({ type: SENDING_REQUEST, sending: false })
    yield put({ type: REQUEST_ERROR, errorData: error.response.data })
    return
  }

  yield put({ type: SENDING_REQUEST, sending: false })
  yield put({ type: REQUEST_SUCCESS, successMessage: 'Success' })
}

export default function* signUp() {
  yield takeLatest(SIGN_UP_REQUEST, performSignUp)
}
