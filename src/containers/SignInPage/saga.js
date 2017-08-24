import axios from 'axios'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'

import { changeAuthenticated, changeUserData } from '../App/actions'
import { getUserEndpoint } from '../../api/users'
import { signInEndpoint } from '../../api/authentication'

import { SIGN_IN_REQUEST } from './constants'

import { clearMessages, requestError, sendingRequest } from './actions'

import makeSelectSignIn from './selector'

function* removeAuth() {
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('token')
  yield put(sendingRequest(false))
  yield put(changeAuthenticated(false))
}

function* signIn() {
  const currentlySending = yield select(makeSelectSignIn('currentlySending'))
  if (currentlySending) {
    return
  }

  const data = yield select(makeSelectSignIn('data'))
  const { email, password } = data

  yield put(clearMessages())
  yield put(sendingRequest(true))

  let response
  try {
    response = yield call(signInEndpoint, email, password)
  } catch (error) {
    yield put(sendingRequest(false))
    yield put(requestError(error.response.data))
    return
  }

  localStorage.setItem('refreshToken', response.data.refreshToken)
  localStorage.setItem('token', response.data.token)

  let decodedData
  try {
    decodedData = jwtDecode(response.data.token)
  } catch (error) {
    yield removeAuth()
    return
  }

  axios.defaults.headers.common.Authorization = `JWT ${response.data.token}`

  const userID = decodedData.userID
  try {
    response = yield call(getUserEndpoint, userID)
  } catch (error) {
    yield removeAuth()
    return
  }

  const { _id, avatar, firstName } = response.data
  const userData = { id: _id, avatar, firstName }
  yield put(changeUserData(userData))

  yield put(sendingRequest(false))
  yield put(changeAuthenticated(true))
}

export default function* watchSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, signIn)
}
