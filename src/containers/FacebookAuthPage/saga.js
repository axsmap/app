import { call, put, takeLatest } from 'redux-saga/effects'

import { facebookAuthEndpoint } from '../../api/authentication'

import { FACEBOOK_AUTH_REQUEST } from './constants'

import { requestError, requestSuccess, sendingRequest } from './actions'

function* facebookAuth(params) {
  console.log('saga')
  yield put(sendingRequest(true))

  try {
    yield call(facebookAuthEndpoint, params.accessToken)
  } catch (error) {
    yield put(sendingRequest(false))
    yield put(requestError(error.response.data))
    return
  }

  yield put(sendingRequest(false))
  yield put(requestSuccess('Success'))
}

export default function* watchFacebookAuth() {
  yield takeLatest(FACEBOOK_AUTH_REQUEST, facebookAuth)
}
