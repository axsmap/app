import { call, put, select, takeLatest } from 'redux-saga/effects'

import { signUpEndpoint } from '../../api/authentication'

import {
  CLEAR,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SENDING_REQUEST,
  SIGN_UP_REQUEST
} from './constants'
import makeSelectSignUp from './selector'

function* signUp() {
  const currentlySending = yield select(makeSelectSignUp('currentlySending'))
  if (currentlySending) {
    return
  }

  const data = yield select(makeSelectSignUp('data'))
  const { email, firstName, isSubscribed, lastName, password } = data

  yield put({ type: CLEAR })
  yield put({ type: SENDING_REQUEST, sending: true })

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
    yield put({ type: SENDING_REQUEST, sending: false })
    yield put({ type: REQUEST_ERROR, errorData: error.response.data })
    return
  }

  yield put({ type: SENDING_REQUEST, sending: false })
  yield put({ type: REQUEST_SUCCESS, successMessage: 'Success' })
}

export default function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}
