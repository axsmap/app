/* eslint no-constant-condition: off */

import { call, put, takeLatest } from 'redux-saga/effects'
import { forEach } from 'lodash'

import { signUpEndpoint } from '../../api/authentication'

import { CLEAR_MESSAGES, REQUEST_ERROR, REQUEST_SUCCESS, SENDING_REQUEST, SIGN_UP_REQUEST } from './constants'

function* processErrors(value, key) {
  yield put({ type: REQUEST_ERROR, key, value })
}

export default function* signUp() {
  while (true) {
    const request = yield takeLatest(SIGN_UP_REQUEST)
    const { email, firstName, lastName, password } = request.data

    yield put({ type: CLEAR_MESSAGES })
    yield put({ type: SENDING_REQUEST, sending: true })

    try {
      yield call(signUpEndpoint, email, firstName, lastName, password)
    } catch (error) {
      yield put({ type: SENDING_REQUEST, sending: false })
      const data = error.response.data
      forEach(data, processErrors)
    }

    yield put({ type: SENDING_REQUEST, sending: false })
    yield put({ type: REQUEST_SUCCESS, successMessage: 'Success' })
  }
}
