import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setCategory as setNotificationCategory,
  setVisibility as setNotificationVisibility
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { signUpEndpoint } from '../../api/authentication'
import makeSelectApp from '../App/selector'

import {
  clearMessageErrors,
  setErrors,
  setNotificationMessage
} from './actions'
import { SIGN_UP_REQUEST } from './constants'
import makeSelectSignUp from './selector'

function* signUpFlow() {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  const data = yield select(makeSelectSignUp('data'))
  const { email, firstName, isSubscribed, lastName, password } = data

  yield put(clearMessageErrors())
  yield put(setSendingRequest(true))
  yield put(startProgress())

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
    yield put(finishProgress())
    yield put(setSendingRequest(false))

    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationCategory('error'))
      yield put(setNotificationMessage('timeoutError'))
      yield put(setNotificationVisibility(true))
      return
    } else if (error.response.data.error) {
      yield put(setNotificationCategory('error'))
      yield put(setNotificationMessage('excessError'))
      yield put(setNotificationVisibility(true))
      return
    } else if (error.response.data.general === 'Something went wrong') {
      yield put(setNotificationCategory('error'))
      yield put(setNotificationMessage('serverError'))
      yield put(setNotificationVisibility(true))
      return
    }

    const errors = error.response.data
    yield all(Object.keys(errors).map(key => put(setErrors(key, errors[key]))))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setNotificationCategory('success'))
  yield put(setNotificationMessage('successMessage'))
  yield put(setNotificationVisibility(true))
}

export default function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUpFlow)
}
