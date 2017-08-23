import { call, put, select, takeLatest } from 'redux-saga/effects'

import { forgottenPasswordEndpoint } from '../../api/authentication'

import makeSelect from './selector'

import {
  CLEAR,
  FORGOTTEN_PASSWORD_REQUEST,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SENDING_REQUEST
} from './constants'

function* resetPassword() {
  const currentlySending = yield select(makeSelect('currentlySending'))
  if (currentlySending) {
    return
  }

  const data = yield select(makeSelect('data'))
  const { email } = data

  yield put({ type: CLEAR })
  yield put({ type: SENDING_REQUEST, sending: true })

  try {
    yield call(forgottenPasswordEndpoint, email)
  } catch (error) {
    yield put({ type: SENDING_REQUEST, sending: false })
    yield put({ type: REQUEST_ERROR, errorData: error.response.data })
    return
  }

  yield put({ type: SENDING_REQUEST, sending: false })
  yield put({ type: REQUEST_SUCCESS, successMessage: 'Success' })
}

export default function* watchResetPassword() {
  yield takeLatest(FORGOTTEN_PASSWORD_REQUEST, resetPassword)
}
