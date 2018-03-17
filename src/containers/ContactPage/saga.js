import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage,
  setType as setNotificationType
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { contactEndpoint } from '../../api/others'
import appSelector from '../App/selector'

import { clearErrors, setError } from './actions'
import { SEND_EMAIL } from './constants'

function* sendEmailFlow({ data }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  yield put(clearErrors())

  try {
    yield call(contactEndpoint, data)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(
        setNotificationMessage('axsmap.components.Contact.timeoutError')
      )
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('axsmap.components.Contact.serverError'))
    } else if (err.response.status === 400) {
      yield put(setNotificationMessage('axsmap.components.Contact.inputError'))
    }

    yield put(setNotificationIsVisible(true))

    const errors = err.response.data
    if (errors) {
      yield all(Object.keys(errors).map(key => put(setError(key, errors[key]))))
    }

    yield put(setSendingRequest(false))
    yield put(finishProgress())

    return
  }

  yield put(setSendingRequest(false))
  yield put(finishProgress())

  yield put(setNotificationType('success'))
  yield put(setNotificationMessage('axsmap.components.Contact.success'))
  yield put(setNotificationIsVisible(true))
}

export default function* contactSaga() {
  yield takeLatest(SEND_EMAIL, sendEmailFlow)
}
