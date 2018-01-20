import axios from 'axios'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import makeSelectApp from '../App/selector'
import {
  setType as setNotificationType,
  setIsVisible as setNotificationIsVisible
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { editPetitionEndpoint, getPetitionsEndpoint } from '../../api/petitions'

import {
  addPetitions,
  changePetitionState,
  clearState,
  removePetition,
  setNextPage,
  setLoadingPetitions,
  setNotificationMessage,
  setPetitions
} from './actions'
import { EDIT_PETITION, GET_PETITIONS } from './constants'
import makeSelectPetitions from './selector'

function* finishAndClearState() {
  yield put(clearState())
  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingPetitions(false))
}

function* getPetitionsFlow() {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  const token = localStorage.getItem('token')

  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  const filter = yield select(makeSelectPetitions('filter'))
  const nextPage = yield select(makeSelectPetitions('nextPage'))
  const getPetitionsParams = {
    page: nextPage,
    filter
  }

  let response
  try {
    response = yield call(getPetitionsEndpoint, getPetitionsParams)
  } catch (error) {
    yield put(setNotificationType('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield finishAndClearState()

    return
  }

  const page = response.data.page
  const lastPage = response.data.lastPage
  const petitions = response.data.results

  if (page < lastPage) {
    yield put(setNextPage(page + 1))
  } else {
    yield put(setNextPage(null))
  }

  if (page === 1) {
    yield put(setPetitions(petitions))
  } else {
    yield put(addPetitions(petitions))
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingPetitions(false))
}

function* editPetitionFlow(params) {
  // update petition in list
  yield put(startProgress())
  yield put(setSendingRequest(true))

  const token = localStorage.getItem('token')

  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  try {
    yield call(editPetitionEndpoint, params.data)
  } catch (error) {
    yield put(setNotificationType('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else if (error.response.data.general === 'Petition not found') {
      yield put(setNotificationMessage('notFoundError'))
      yield put(removePetition(params.data.id))
    } else if (error.response.data.general === 'Is already accepted') {
      yield put(setNotificationMessage('alreadyAcceptedError'))
      yield put(changePetitionState(params.data.id, params.data.state))
    } else if (error.response.data.general === 'Is already canceled') {
      yield put(setNotificationMessage('alreadyCanceledError'))
      yield put(changePetitionState(params.data.id, params.data.state))
    } else if (error.response.data.general === 'Is already rejected') {
      yield put(setNotificationMessage('alreadyRejectedError'))
      yield put(changePetitionState(params.data.id, params.data.state))
    } else if (error.response.data.general === 'Should only be canceled') {
      yield put(setNotificationMessage('shouldOnlyBeCanceledError'))
    } else if (
      error.response.data.general ===
      'Event is already removed. Petition was removed'
    ) {
      yield put(setNotificationMessage('eventAlreadyRemovedError'))
      yield put(removePetition(params.data.id))
    } else if (
      error.response.data.general ===
      'User is already a participant of event. Petition was removed'
    ) {
      yield put(setNotificationMessage('userAlreadyParticipantError'))
      yield put(removePetition(params.data.id))
    } else if (error.response.data.general === 'Forbidden action') {
      yield put(setNotificationMessage('forbiddenActionError'))
      yield put(removePetition(params.data.id))
    } else if (
      error.response.data.general ===
      'User is already removed. Petition was removed'
    ) {
      yield put(setNotificationMessage('userAlreadyRemovedError'))
      yield put(removePetition(params.data.id))
    } else if (
      error.response.data.general ===
      'Team is already removed. Petition was removed'
    ) {
      yield put(setNotificationMessage('teamAlreadyRemovedError'))
      yield put(removePetition(params.data.id))
    } else if (
      error.response.data.general ===
      'User is already a member of team. Petition was removed'
    ) {
      yield put(setNotificationMessage('userAlreadyMemberError'))
      yield put(removePetition(params.data.id))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(setSendingRequest(false))
    yield put(finishProgress())

    return
  }

  yield put(changePetitionState(params.data.id, params.data.state))
  yield put(setSendingRequest(false))
  yield put(finishProgress())
}

export default function* petitionsSaga() {
  yield takeLatest(GET_PETITIONS, getPetitionsFlow)
  yield takeLatest(EDIT_PETITION, editPetitionFlow)
}
