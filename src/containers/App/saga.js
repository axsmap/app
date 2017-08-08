import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { call, put, takeLatest } from 'redux-saga/effects'

import { getUserEndpoint } from '../../api/users'

import {
  CHANGE_AUTHENTICATED,
  CHANGE_IS_AUTHENTICATING,
  CHANGE_USER_DATA,
  HANDLE_AUTHENTICATION
} from './constants'

function* removeAuth() {
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('token')
  yield put({
    type: CHANGE_USER_DATA,
    userData: { id: '', avatar: '', firstName: '' }
  })
  yield put({ type: CHANGE_IS_AUTHENTICATING, isAuthenticating: false })
  yield put({ type: CHANGE_AUTHENTICATED, authenticated: false })
}

function* handleAuthentication() {
  const token = localStorage.getItem('token')

  if (!token) {
    yield removeAuth()
    return
  }

  let decodedData
  try {
    decodedData = jwtDecode(token)
  } catch (error) {
    yield removeAuth()
    return
  }

  const currentDate = new Date()
  const currentTime = currentDate.getTime()

  if (currentTime <= decodedData.exp) {
    yield removeAuth()
    return
  }

  axios.defaults.headers.common.Authorization = `JWT ${token}`

  let response
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

  yield put({ type: CHANGE_IS_AUTHENTICATING, isAuthenticating: false })
  yield put({ type: CHANGE_AUTHENTICATED, authenticated: true })
}

export default function* watchApp() {
  yield takeLatest(HANDLE_AUTHENTICATION, handleAuthentication)
}
