import { call, put, select, takeLatest } from 'redux-saga/effects'

import { resetPasswordEndpoint } from '../../api/authentication'

import { makeSelectData } from './selectors'

import {
  CLEAR,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST,
  SENDING_REQUEST
} from './constants'

function* performResetPassword() {
  const data = yield select(makeSelectData())
  const { newPassword } = data

  yield put({ type: CLEAR })
  yield put({ type: SENDING_REQUEST, sending: true })

  try {
    yield call(resetPasswordEndpoint, '', newPassword)
  } catch (error) {
    yield put({ type: SENDING_REQUEST, sending: false })
    yield put({ type: REQUEST_ERROR, errorMessage: error.response.data })
    return
  }

  yield put({ type: SENDING_REQUEST, sending: false })
  yield put({ type: REQUEST_SUCCESS, successMessage: 'Success' })
}

export default function* resetPassword() {
  yield takeLatest(RESET_PASSWORD_REQUEST, performResetPassword)
}
