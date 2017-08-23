import axios from 'axios'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'

import { CHANGE_AUTHENTICATED, CHANGE_USER_DATA } from '../App/constants'
import { getUserEndpoint } from '../../api/users'
import { signInEndpoint } from '../../api/authentication'

import {
  CLEAR,
  REQUEST_ERROR,
  SENDING_REQUEST,
  SIGN_IN_REQUEST
} from './constants'
import makeSelectSignIn from './selector'

function* removeAuth() {
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('token')
  yield put({ type: SENDING_REQUEST, sending: false })
  yield put({ type: CHANGE_AUTHENTICATED, authenticated: false })
}

function* signIn() {
  const currentlySending = yield select(makeSelectSignIn('currentlySending'))
  if (currentlySending) {
    return
  }

  const data = yield select(makeSelectSignIn('data'))
  const { email, password } = data

  yield put({ type: CLEAR })
  yield put({ type: SENDING_REQUEST, sending: true })

  let response
  try {
    response = yield call(signInEndpoint, email, password)
  } catch (error) {
    yield put({ type: SENDING_REQUEST, sending: false })
    yield put({
      type: REQUEST_ERROR,
      errorData: error.response.data
    })
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
  yield put({ type: CHANGE_USER_DATA, userData })

  yield put({ type: SENDING_REQUEST, sending: false })
  yield put({ type: CHANGE_AUTHENTICATED, authenticated: true })
}

export default function* watchSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, signIn)
}
