import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setType as setNotificationType,
  setIsVisible as setNotificationIsVisible
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import appSelector from '../App/selector'
import { editMapathonEndpoint, getMapathonEndpoint } from '../../api/mapathons'
import { createPetitionEndpoint } from '../../api/petitions'
import { getTeamsEndpoint } from '../../api/teams'
import { getUsersEndpoint } from '../../api/users'

import {
  setEditIsVisible,
  setErrors,
  setLoadingMapathon,
  setLoadingTeams,
  setLoadingTeamsManagers,
  setLoadingUsers,
  setMapathon,
  setNotificationMessage,
  setTeams,
  setTeamsManagers,
  setUsers
} from './actions'
import {
  CREATE_PETITION,
  EDIT_MAPATHON,
  GET_MAPATHON,
  GET_TEAMS,
  GET_TEAMS_MANAGERS,
  GET_USERS,
  PROMOTE_PARTICIPANT,
  REMOVE_MANAGER,
  REMOVE_PARTICIPANT,
  REMOVE_TEAM
} from './constants'
import mapathonSelector from './selector'

function* showNotificationError(message) {
  yield put(setNotificationType('error'))
  yield put(setNotificationMessage(message))
  yield put(setNotificationIsVisible(true))
  yield put(finishProgress())
  yield put(setSendingRequest(false))
}

function* getMapathonFlow(params) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  let response
  try {
    response = yield call(getMapathonEndpoint, params.mapathonId)
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      yield showNotificationError('timeoutError')
    } else if (error.response.status === 500) {
      yield showNotificationError('serverError')
    } else if (error.response.data.general === 'Event not found') {
      yield showNotificationError('notFoundError')
    }

    yield put(setLoadingMapathon(false))
    return
  }

  yield put(setMapathon(response.data))

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingMapathon(false))
}

function* editMapathonFlow({ mapathonId, data }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  let mapathonPoster = ''
  if (data.poster && !data.poster.startsWith('https://')) {
    mapathonPoster = data.poster
  }

  const mapathonManagers = data.managers ? data.managers.map(m => m.id) : []
  const mapathonParticipants = data.participants
    ? data.participants.map(p => p.id)
    : []

  const mapathonData = {
    address: data.address,
    description: data.description,
    endDate: data.endDate || '',
    isOpen: data.isOpen,
    name: data.name,
    managers: mapathonManagers,
    participants: mapathonParticipants,
    participantsGoal: data.participantsGoal
      ? Number(data.participantsGoal)
      : null,
    poster: mapathonPoster,
    reviewsGoal: data.reviewsGoal ? Number(data.reviewsGoal) : null,
    startDate: data.startDate || '',
    teamManager: data.teamManager
  }

  try {
    yield call(editMapathonEndpoint, mapathonId, mapathonData)
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      yield showNotificationError('timeoutError')
      return
    } else if (err.response.status === 500) {
      yield showNotificationError('serverError')
      return
    } else if (err.response.status === 401) {
      yield put(finishProgress())
      yield put(setSendingRequest(false))
      return
    } else if (err.response.status === 423) {
      yield showNotificationError('blockedError')
      return
    } else if (err.response.status === 403) {
      yield showNotificationError('forbiddenError')
      return
    } else if (
      err.response.data.managers === 'Should not remove all managers'
    ) {
      yield showNotificationError('removeManagersError')
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
  yield put(setLoadingMapathon(true))
  yield call(getMapathonFlow, { mapathonId })
}

function* removeManagerFlow({ mapathonId, userId }) {
  const mapathon = yield select(mapathonSelector('mapathon'))
  const managers = mapathon.managers.map(m => {
    let id = m.id
    if (m.id === userId) {
      id = `-${m.id}`
    }
    return Object.assign({}, m, { id })
  })
  const data = { managers }
  yield call(editMapathonFlow, { mapathonId, data })
}

function* promoteParticipantFlow({ mapathonId, userId }) {
  const mapathon = yield select(mapathonSelector('mapathon'))
  const managers = [...mapathon.managers, { id: userId }]
  const data = { managers }
  yield call(editMapathonFlow, { mapathonId, data })
}

function* removeParticipantFlow({ mapathonId, userId }) {
  const participants = [
    {
      id: `-${userId}`
    }
  ]
  const data = { participants }
  yield call(editMapathonFlow, { mapathonId, data })
}

function* removeTeamFlow({ mapathonId, teamId }) {
  const teams = [
    {
      id: `-${teamId}`
    }
  ]
  const data = { teams }
  yield call(editMapathonFlow, { mapathonId, data })
}

function* getTeamsFlow({ keywords }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))
  yield put(setLoadingTeams(true))

  const params = {
    keywords,
    page: 1,
    pageLimit: 5
  }

  let response
  try {
    response = yield call(getTeamsEndpoint, params)
  } catch (error) {
    yield put(setNotificationType('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(setTeams([]))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingTeams(false))
    return
  }

  if (response.data.results.length === 0) {
    yield put(setTeams([]))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingTeams(false))
    return
  }

  const teams = response.data.results.slice(0, 5).map(t => ({
    id: t.id,
    avatar: t.avatar,
    name: t.name
  }))
  yield put(setTeams(teams))

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingTeams(false))
}

function* getTeamsManagersFlow({ keywords }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))
  yield put(setLoadingTeamsManagers(true))

  const params = {
    keywords,
    managed: 1,
    page: 1,
    pageLimit: 5
  }

  let response
  try {
    response = yield call(getTeamsEndpoint, params)
  } catch (error) {
    yield put(setNotificationType('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(setTeamsManagers([]))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingTeamsManagers(false))
    return
  }

  if (response.data.results.length === 0) {
    yield put(setTeamsManagers([]))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingTeamsManagers(false))
    return
  }

  const teamsManagers = response.data.results.map(t => ({
    id: t.id,
    avatar: t.avatar,
    name: t.name
  }))
  yield put(setTeamsManagers(teamsManagers))

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingTeamsManagers(false))
}

function* getUsersFlow({ keywords }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))
  yield put(setLoadingUsers(true))

  const params = {
    keywords,
    page: 1,
    pageLimit: 5
  }

  let response
  try {
    response = yield call(getUsersEndpoint, params)
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

function* createPetitionFlow({ id, petitionType }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  const mapathon = yield select(mapathonSelector('mapathon'))
  let data
  if (petitionType === 'user-event') {
    data = { event: mapathon.id, type: 'invite-user-event', user: id }
  } else if (petitionType === 'team-event') {
    data = { event: mapathon.id, type: 'invite-team-event', team: id }
  }
  try {
    yield call(createPetitionEndpoint, data)
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
      'User already has a pending invitation to event'
    ) {
      yield put(setNotificationMessage('alreadyPendingUserError'))
    } else if (
      err.response.data.general ===
      'Team already has a pending invitation to event'
    ) {
      yield put(setNotificationMessage('alreadyPendingTeamError'))
    } else if (
      err.response.data.general === 'User is already participant of event' ||
      err.response.data.general === 'Team is already participant of event'
    ) {
      yield put(setNotificationMessage('alreadyParticipantError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setNotificationType('success'))
  yield put(setNotificationMessage('invitationSuccess'))
  yield put(setNotificationIsVisible(true))
}

export default function* mapathonSaga() {
  yield takeLatest(GET_MAPATHON, getMapathonFlow)
  yield takeLatest(EDIT_MAPATHON, editMapathonFlow)
  yield takeLatest(REMOVE_MANAGER, removeManagerFlow)
  yield takeLatest(PROMOTE_PARTICIPANT, promoteParticipantFlow)
  yield takeLatest(REMOVE_PARTICIPANT, removeParticipantFlow)
  yield takeLatest(REMOVE_TEAM, removeTeamFlow)
  yield takeLatest(GET_TEAMS, getTeamsFlow)
  yield takeLatest(GET_TEAMS_MANAGERS, getTeamsManagersFlow)
  yield takeLatest(GET_USERS, getUsersFlow)
  yield takeLatest(CREATE_PETITION, createPetitionFlow)
}
