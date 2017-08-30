import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { call, put, takeLatest } from 'redux-saga/effects'

import { getUserEndpoint } from '../../api/users'

import { HANDLE_AUTHENTICATION } from './constants'
import {
  changeAuthenticated,
  changeIsAuthenticating,
  changeUserData
} from './actions'

function* removeAuth() {
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('token')

  const userData = { id: '', avatar: '', firstName: '' }
  yield put(changeUserData(userData))
  yield put(changeIsAuthenticating(false))
  yield put(changeAuthenticated(false))
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
  const userId = decodedData.userId
  try {
    response = yield call(getUserEndpoint, userId)
  } catch (error) {
    yield removeAuth()
    return
  }

  const { _id, avatar, firstName } = response.data
  const userData = { id: _id, avatar, firstName }
  yield put(changeUserData(userData))

  yield put(changeIsAuthenticating(false))
  yield put(changeAuthenticated(true))
}

export default function* watchApp() {
  yield takeLatest(HANDLE_AUTHENTICATION, handleAuthentication)
}
