import { intersection } from 'lodash'
import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setType as setNotificationType,
  setIsVisible as setNotificationIsVisible
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import makeSelectApp from '../App/selector'
import { createPetitionEndpoint } from '../../api/petitions'
import { editTeamEndpoint, getTeamEndpoint } from '../../api/teams'
import { getUsersEndpoint } from '../../api/users'

import {
  setEditIsVisible,
  setErrors,
  setLoadingTeam,
  setLoadingUsers,
  setNotificationMessage,
  setPetitionSent,
  setTeam,
  setUsers
} from './actions'
import { CREATE_PETITION, EDIT_TEAM, GET_TEAM, GET_USERS } from './constants'
import makeSelectTeam from './selector'

function* getTeamFlow(params) {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  let response
  try {
    response = yield call(getTeamEndpoint, params.teamId)
  } catch (error) {
    yield put(setNotificationType('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else if (error.response.data.general === 'Place not found') {
      yield put(setNotificationMessage('notFoundError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingTeam(false))

    return
  }

  yield put(setTeam(response.data))

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingTeam(false))
}

function* editTeamFlow({ teamId, data }) {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  let teamAvatar = ''
  if (data.avatar && !data.avatar.startsWith('https://')) {
    teamAvatar = data.avatar
  }

  const team = yield select(makeSelectTeam('team'))
  const teamManagers = team.managers.map(m => m.id)
  const teamMembers = team.members.map(m => m.id)

  const teamData = {
    avatar: teamAvatar,
    description: data.description,
    name: data.name,
    managers: intersection(teamManagers, data.members),
    members: intersection(teamMembers, data.members)
  }

  try {
    yield call(editTeamEndpoint, teamId, teamData)
  } catch (err) {
    yield put(setNotificationType('error'))
    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
      yield put(setNotificationIsVisible(true))
      return
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('serverError'))
      yield put(setNotificationIsVisible(true))
      return
    } else if (err.response.status === 401) {
      return
    } else if (err.response.status === 423) {
      yield put(setNotificationMessage('blockedError'))
      yield put(setNotificationIsVisible(true))
      return
    }

    const errors = err.response.data
    yield all(Object.keys(errors).map(key => put(setErrors(key, errors[key]))))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setEditIsVisible(false))
  yield call(getTeamFlow, {
    teamId: team.id
  })
}

function* getUsersFlow({ keywords }) {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))
  yield put(setLoadingUsers(true))

  let response
  try {
    response = yield call(getUsersEndpoint, { keywords })
  } catch (error) {
    yield put(setNotificationType('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(setUsers([]))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingUsers(false))
    return
  }

  if (response.data.results.length === 0) {
    yield put(setUsers([]))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingUsers(false))
    return
  }

  const users = response.data.results.slice(0, 5).map(u => ({
    id: u.id,
    avatar: u.avatar,
    firstName: u.firstName,
    lastName: u.lastName,
    username: u.username
  }))
  yield put(setUsers(users))

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingUsers(false))
}

function* createPetitionFlow({ data }) {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  yield put(setPetitionSent(false))

  try {
    yield call(
      createPetitionEndpoint,
      Object.assign({}, data, { type: 'invite-user-team' })
    )
  } catch (err) {
    yield put(setNotificationType('error'))
    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('serverError'))
    } else if (err.response.status === 401) {
      return
    } else if (err.response.status === 423) {
      yield put(setNotificationMessage('blockedError'))
    } else if (err.response.data.general === 'User should not be you') {
      yield put(setNotificationMessage('sameUserError'))
    } else if (
      err.response.data.general ===
      'User already has a pending invitation to team'
    ) {
      yield put(setNotificationMessage('alreadyPendingError'))
    } else if (err.response.data.general === 'User is already member of team') {
      yield put(setNotificationMessage('alreadyMemberError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setPetitionSent(true))
}

export default function* teamSaga() {
  yield takeLatest(GET_TEAM, getTeamFlow)
  yield takeLatest(EDIT_TEAM, editTeamFlow)
  yield takeLatest(GET_USERS, getUsersFlow)
  yield takeLatest(CREATE_PETITION, createPetitionFlow)
}
